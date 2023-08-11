<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="text-center">{{ motor.production }} {{ motor.model }} {{ motor.year }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <ul class="nav">
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MotorOffers', query: { filter: 'confirm' }}" class="nav-link" id="confirm" 
              @click="linkHandler">Đang chờ xác nhận</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MotorOffers', query: { filter: 'all' }}" class="nav-link" id="all"
              @click="linkHandler">Tất cả</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5" v-if="loading">
      <div class="col-12">
        <Loader/>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12 my-3 d-flex justify-content-center" v-for="offer in offers">
        <div class="card w-75">
          <div class="image-container">
            <img
              class="card-img-top"
              :src="offer.user.avatarUrl ? offer.user.avatarUrl : 
              'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'"
              alt="Motor Image"
            />
          </div>
          <div class="card-body">
            <div class="details-container clearfix">
              <div class="d-flex align-items-center justify-content-between">
                <router-link :to="{ name: 'OfferDetails', params: { id: offer.id } }"
                  ><h5 class="card-title">{{ offer.user.userName }}</h5></router-link>
                <span class="badge badge-success" v-if="!offer.status || offer.status == 'COMPLETED'">Đã xác nhận</span>
                <span class="badge badge-info" v-else-if="offer.status == 'RETURNED'">Đã trả</span>
                <span class="badge badge-primary" v-else-if="offer.status == 'BOOKING'">Đang đặt</span>
                <span class="badge badge-danger" v-else-if="offer.endTime > new Date().getTime() 
                  && offer.status != 'RETURNED' || offer.status == 'OUTDATED'">Quá hạn</span>
                <span class="badge badge-warning" v-else-if="offer.status == 'CANCELED'">Đã hủy</span>
              </div>
              <div class="info-container">
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian bắt đầu: </b></span>
                  <span>{{ new Date(offer.startTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian kết thúc:</b></span>
                  <span>{{ new Date(offer.endTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <span class="mr-1"><b>Giá: </b></span>
                  <span>{{ price(offer) }} VND</span>
                </div>
              </div>
            </div>
            <div class="button-group">
              <button 
                class="btn btn-primary" 
                type="button" 
                @click="confirm(offer.id)"
                :disabled="offer.status != 'RETURNED'"
              >Xác nhận</button>
              <button 
                class="btn btn-secondary" 
                type="button"
                @click="cancel(offer.id, offer.endTime)"
                :disabled="offer.status != 'RETURNED'"
              >Từ chối</button>
              <button  
                class="btn btn-danger" 
                type="button" 
                @click="outdate(offer.id)"
                v-if="offer.status != 'OUTDATED'"
                :disabled="offer.status == 'COMPLETED'"
              >Đã quá hạn</button>
              <button 
                class="btn btn-info" 
                type="button"
                @click="undo(offer.id, offer.endTime)"
                v-else
              >Hoàn tác</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loader from '../../components/Atomic/Loader.vue';
  export default {
    data() {
      return {
        motorId: null,
        active: 'confirm',
        motor: {},
        bookings: [],
        loading: true, 
      }
    },
    name: 'MotorOffers',
    props: ["baseURL", "user", "motors"],
    emits: ["fetchData"],
    components: { Loader },
    methods: {
      linkHandler(e) {
        e.preventDefault();
        this.active = e.target.id;
        document.getElementsByClassName("active")[0].setAttribute("class", "nav-link");
        e.target.setAttribute("class", "nav-link active");
      },

      filter() {
        switch(this.active) {
          case 'all': 
            this.offers = this.bookings;
            break;
          case 'confirm':
            this.offers = this.bookings.filter(booking => booking.status == 'RETURNED');
            break;
        }
      },

      async fetchOffer() {
        await axios.get(`${this.baseURL}offer/motor/${this.motorId}`)
        .then(res => {
          if (res.status == 200) {
            this.bookings = this.bookings.concat(res.data);
          }
          this.filter();
          this.loading = false;
        })
        .catch(err => console.log(err));
      },

      async getMotor() {
        await axios.get(`${this.baseURL}motor/${this.motorId}`)
        .then(res => {
          if (res.status == 200) {
            this.motor = res.data;
          }
        })
        .catch(err => console.log(err));
      },

      price(offer) {
        let cost = offer.price;
        if (offer.status == 'OUTDATED' && new Date() > new Date(offer.endTime)) {
          let fine = Math.floor((new Date().getTime() - offer.endTime) / 3600000) * this.motor.price * 1.5;
          cost = cost + fine;
        }
        return cost; 
      },

      confirm(id) {
        swal({
          icon: "warning",
          text: "Xác nhận xe đã được trả? ",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        })
        .then(value => {
          if (value == "OK") {
            axios.patch(`${this.baseURL}offer/${id}`, {
              status: 'COMPLETED'
            }, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(() => {
              swal({
                text: "Trả xe hoàn tất.",
                icon: "success",
              });
              this.$emit("fetchData");
            })
            .catch(err => {
              console.log(err);
              swal({
                text: err.message,
                icon: "error",
              })
            })
          }
        });
      },

      cancel(id, endtime) {
        swal({
          icon: "warning",
          text: "Xác nhận từ chối? ",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        })
        .then(value => {
          if (value == "OK") {
            let status;
            if (new Date(endtime) <= new Date()) {
              status = 'BOOKING';
            } else {
              status = 'OUTDATED';
            }
            axios.patch(`${this.baseURL}offer/${id}`, {
              status: status
            }, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(() => {
              swal({
                text: "Hoàn tất.",
                icon: "success",
              });
              this.$emit("fetchData");
            })
            .catch(err => {
              console.log(err);
              swal({
                text: err.message,
                icon: "error",
              })
            })
          }
        });
      },

      undo(id, endtime) {
        swal({
          icon: "warning",
          text: "Xác nhận hoàn tác? ",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        })
        .then(value => {
          if (value == "OK") {
            let status;
            if (new Date(endtime) <= new Date()) {
              status = 'BOOKING';
            } else {
              status = 'OUTDATED';
            }
            axios.patch(`${this.baseURL}offer/${id}`, {
              status: status
            }, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(() => {
              swal({
                text: "Hoàn tất.",
                icon: "success",
              });
              this.$emit("fetchData");
            })
            .catch(err => {
              console.log(err);
              swal({
                text: err.message,
                icon: "error",
              })
            })
          }
        });
      },

      outdate(id) {
        swal({
          icon: "warning",
          text: "Xác nhận xe đã quá hạn trả? ",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        })
        .then(value => {
          if (value == "OK") {
            axios.patch(`${this.baseURL}offer/${id}`, {
              status: 'OUTDATED'
            }, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(() => {
              swal({
                text: "Hoàn tất.",
                icon: "success",
              });
              this.$emit("fetchData");
            })
            .catch(err => {
              console.log(err);
              swal({
                text: err.message,
                icon: "error",
              })
            })
          }
        });
      },
    },

    watch: {
      active() {
        this.filter();
      }
    },

    mounted() {
      this.motorId = this.$route.params.id;
      if (this.$route.query.filter) {
        this.active = this.$route.query.filter;
      }
      document.getElementById(this.active).setAttribute("class", "nav-link active");
      this.getMotor();
      this.fetchOffer();
      this.filter();
    }
  }
</script>
<style scoped>
  h3.text-center {
    font-weight: 700;
  }

  .active {
      font-weight: bold;
      cursor: pointer;
  }

  .card {
    background-color: white;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
    flex-direction: row;
    padding: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .white-text {
    color: #fff;
  }

  .mx-center {
    margin-top: 1rem;
    margin-left: calc(50% - 5rem);
  }

  img.clock {
    height: 18px;
    margin-right: 5px;
  }

  .card-img-top {
    aspect-ratio: 1 / 1;
    height: 220px;
  }

  .card-body {
    justify-content: space-between;
  }

  .badge {
    font-size: medium;
  }

  .button-group {
    margin-top: 2rem;
    display: flex;
    justify-content: right;
  }

  .btn {
    margin-left: 1rem;
  }
</style>
