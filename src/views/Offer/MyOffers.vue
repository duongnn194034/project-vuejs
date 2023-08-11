<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="text-center">Tất cả yêu cầu</h3>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <ul class="nav">
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'upcoming' }}" class="nav-link" id="upcoming" 
              @click="linkHandler">Đang đặt</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'completed' }}" class="nav-link" id="completed"
              @click="linkHandler">Đã trả</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'canceled' }}" class="nav-link" id="canceled"
              @click="linkHandler">Đã hủy</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'all' }}" class="nav-link" id="all"
              @click="linkHandler">Tất cả</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mt-5" v-if="loading">
      <div class="col-12">
        <Loader/>
      </div>
    </div>
    <div class="row" v-else-if="bookings.length">
      <div class="col-md-4 my-3" v-for="offer in offers">
        <div class="card w-100">
          <div class="image-container">
            <img
              class="card-img-top"
              :src="offer.vehicle?.imageUrl?.length ? offer.vehicle.imageUrl[0] : 
              'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'"
              alt="Motor Image"
            />
          </div>
          <div class="card-body">
            <div class="details-container clearfix">
              <div class="d-flex align-items-center justify-content-between">
                <router-link :to="{ name: 'OfferDetails', params: { id: offer.id } }"
                  ><h5 class="card-title">{{ offer.vehicle.model }}</h5></router-link>
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
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Thời gian đặt: </b></span>
                  <span>{{ new Date(offer.createdDate).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5" v-else>
      <div class="col-12">
        <h4 class="text-center">Bạn chưa thuê bất kì xe nào cho tới hiện tại.</h4>
        <button class="btn btn-primary mx-center" type="button" @click="submit">Tìm xe nhanh</button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Loader from '../../components/Atomic/Loader.vue';
  export default {
    data() {
      return {
        active: 'upcoming',
        bookings: [],
        offers: [],
        loading: true,
      }
    },
    props: ["baseURL", "user"],
    components: { Loader },
    name: 'MyOffers',
    methods: {
      linkHandler(e) {
        e.preventDefault();
        this.active = e.target.id;
        document.getElementsByClassName("active")[0].setAttribute("class", "nav-link");
        e.target.setAttribute("class", "nav-link active");
      },

      async fetchOffer() {
        await axios.get(`${this.baseURL}offer/list`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.bookings = this.bookings.concat(res.data);
          }
          this.filter();
          this.loading = false;
        })
        .catch(err => console.log(err));
      },

      filter() {
        switch(this.active) {
          case 'all': 
            this.offers = this.bookings;
            break;
          case 'upcoming':
            this.offers = this.bookings.filter(booking => (booking.endTime > new Date() || booking.status == 'BOOKING'));
            break;
          case 'completed':
            this.offers = this.bookings.filter(booking => booking.status == 'COMPLETED');
            break;
          case 'canceled':
            this.offers = this.bookings.filter(booking => booking.status == 'CANCELED');
            break;
        }
      },

      async submit() {
        this.loading = true;
        await axios
          .get(`https://nominatim.openstreetmap.org/search?q=${this.user.address.line}&format=json&limit=1`)
          .then((res) => {
            this.$router.push({ name: 'ListMotors', query: { query: this.user.address.line, lat: res.data[0].lat, lon: res.data[0].lon }})
          })
          .catch((err) => console.log(err));
      },
    },
    watch: {
      active() {
        this.filter();
      }
    },
    mounted() {
      if (this.$route.query.filter) {
        this.active = this.$route.query.filter;
      }
      document.getElementById(this.active).setAttribute("class", "nav-link active");
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
    aspect-ratio: 3 / 2;
  }
</style>