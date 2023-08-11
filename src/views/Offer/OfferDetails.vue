<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ offer.vehicle.production }} {{ offer.vehicle.model }} {{ offer.vehicle.year }}</h2>
    </div>
    <div class="row pt-3">
      <div class="col-md-7 col-xs-12">
        <div class="card w-100 card-shadow">
          <div class="image-container">
            <div id="carouselMotorControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img width="900" height="600" :src="offer.vehicle.imageUrl[0]" :alt="offer.vehicle.model" class="img-fluid motor"/>
                </div>
                <div class="carousel-item" v-for="item in imageUrls">
                  <img width="900" height="600" :src="item" :alt="offer.vehicle.model" class="img-fluid motor"/>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselMotorControls" role="button" data-slide="prev" v-if="offer.vehicle.imageUrl.length > 1">
                <span class="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselMotorControls" role="button" data-slide="next" v-if="offer.vehicle.imageUrl.length > 1">
                <span class="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="card-body bg-secondary text-white">
            <h3>Owner Note</h3>
            <p class="note">{{ offer.vehicle.note }}</p>
          </div>
          <div class="card-body">
            <section>
              <dl>
                <div class="row">
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Hàng</dt>
                    <dd>{{ offer.vehicle.production }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Loại xăng</dt>
                    <dd>{{ offer.vehicle.fuel }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Mẫu</dt>
                    <dd>{{ offer.vehicle.model }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Loại phương tiện</dt>
                    <dd>{{ offer.vehicle.type }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Dung tích</dt>
                    <dd>{{ offer.vehicle.engineSize }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Năm</dt>
                    <dd>{{ offer.vehicle.year }}</dd>
                  </div>
                </div>
              </dl>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Thông tin khác</h5>
              <div class="row">
                <div class="col-lg-4 col-xs-6 pb-3" v-for="f in features">
                  <span><abbr :title="this.toolTip[f]">{{ f }}</abbr></span>
                </div>
              </div>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Ràng buộc</h5>
              <div class="row">
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Tuổi tối thiểu: {{ offer.vehicle.minAge }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Số năm lái tối thiểu: {{ offer.vehicle.minDriving }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Thời gian thuê tối thiểu: {{ toDateString(offer.vehicle.minDur) }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Thời gian thuê tối đa: {{ toDateString(offer.vehicle.maxDur) }}</span>
                </div>
              </div>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Địa điểm nhận xe</h5>
              <div id="map"></div>
            </section>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-xs-12">
        <div class="card w-100 card-shadow sticky-card">
          <div class="card-body">
            <section>
              <div class="row">
                <div class="col-12">
                  <span><b>Trạng thái:  </b></span>
                  <span class="badge badge-success" v-if="!offer.status || offer.status == 'COMPLETED'">Đã xác nhận</span>
                  <span class="badge badge-info" v-else-if="offer.status == 'RETURNED'">Đã trả</span>
                  <span class="badge badge-primary" v-else-if="offer.status == 'BOOKING'">Đang đặt</span>
                  <span class="badge badge-danger" v-else-if="offer.endTime > new Date().getTime() 
                    && offer.status != 'RETURNED' || offer.status == 'OUTDATED'">Quá hạn</span>
                  <span class="badge badge-warning" v-else-if="offer.status == 'CANCELED'">Đã hủy</span>
                </div>
                <div class="col-12">
                  <span><b>Thời gian bắt đầu:  </b>{{ new Date(offer.startTime).toLocaleString() }}</span>
                </div>
                <div class="col-12">
                  <span><b>Thời gian kết thúc:  </b>{{ new Date(offer.endTime).toLocaleString() }}</span>
                </div>
                <div class="col-12">
                  <span><b>Thời gian đặt:  </b>{{ new Date(offer.createdDate).toLocaleString() }}</span>
                </div>
                <div class="col-12">
                  <span><b>Giá thuê: </b>{{ offer.price }}</span>
                </div>
                <div class="col-12 mt-5 d-flex justify-content-center">
                  <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" 
                    :disabled="offer.status == 'RETURNED' || offer.status == 'CANCELED'"
                  >Trả xe</button>
                  <button class="btn btn-danger ml-4" @click="cancel" 
                    :disabled="offer.status == 'RETURNED' || offer.status == 'CANCELED'"
                  >Hủy đặt</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel">Đánh giá xe - {{ offer.vehicle.model }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="stars">Đánh giá</label>
                <div class="d-flex justify-content-center" id="stars">
                  <img src="../../assets/star.svg" class="star" v-for="i in 5" :key="i" :id="'star' + i" 
                    @click.stop="select" 
                    @mouseover="select"
                    @mouseout="reset"
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="comment">Bình luận</label>
                <textarea id="comment" class="form-control" rows="5" v-model="comment"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="sendRate">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import swal from 'sweetalert';
  export default {
    data() {
      return {
        id: null,
        offer: {
          vehicle: {
            imageUrl: [""]
          }
        },
        features: [],
        toolTip: {
          "Fuel Cost": "Guest have to refill fuel before returning.",
          "Damage Insurance": "Damage Insurance included.",
          "Stolen Insurance": "Stolen Insurance included.",
          "Order Canceling": "Order can be canceled at least 2 days before ordered date.",
          "Adjust": "Tax, others fee included.",
        },
        comment: "",
        rate: 0,
        starState: [0.3, 0.3, 0.3, 0.3, 0.3],
        token: null,
      }
    },
    props: ["baseURL"],
    name: 'OfferDetails',
    methods: {
      async fetchOffer() {
        await axios.get(`${this.baseURL}offer/${this.id}`, {
          headers: {
            token: this.token
          }
        })
          .then(res => {
            this.offer = res.data;
            for (let key in this.offer.vehicle.feature) {
            if (this.offer.vehicle.feature[key] == true) {
              this.features.push(this.stringfy(key));
            }
          }
            var map = L.map('map').setView([this.offer.vehicle.location.y, this.offer.vehicle.location.x], 12);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var circle = L.circle([this.offer.vehicle.location.y, this.offer.vehicle.location.x], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: this.offer.vehicle.radius ? this.offer.vehicle.radius * 1000 : 1000
            }).addTo(map);
          })
      },

      stringfy(string) {
        return string
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, function(str){ return str.toUpperCase(); })
      },

      toDateString(timestamp) {
        const day = Math.floor(timestamp / 86400000);
        const hour = Math.floor((timestamp % 86400000) / 3600000);
        let res = '';
        if (day > 1) {
          res = res + day + ' ngày ';
        } else if (day > 0) {
          res = res + '1 ngày ';
        }
        if (hour > 1) {
          res = res + hour + ' giờ'
        } else {
          res = res + hour + ' giờ';
        }
        return res;
      },

      select(event) {
        event.preventDefault();
        const index = event.target.id.slice(-1);
        for (var i = 1; i <= 5; i++) {
          var star = document.getElementById('star' + i);
          if (i <= index) {
            star.style.opacity = 1;
          } else {
            star.style.opacity = 0.3;
          }
          if (event.type == 'click') {
            this.rate = index;
            this.starState[i - 1] = star.style.opacity;
          }
        }
      },

      reset(event) {
        event.preventDefault();
        for (var i = 1; i <= 5; i++) {
          var star = document.getElementById('star' + i);
          star.style.opacity = this.starState[i - 1];
        }
      },

      cancel() {
        swal({
          icon: "warning",
          text: "Xác nhận hủy thuê? ",
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
            axios.patch(`${this.baseURL}offer/${this.id}`, {
              status: 'CANCELED'
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

      async sendRate(e) {
        e.preventDefault();
        swal({
          icon: "warning",
          text: "Confirm",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          },
        }).then(value => {
          if (value == "OK") {
            axios.patch(`${this.baseURL}motor/rate/${this.offer.vehicle.id}`, {
              rating: this.rate,
              comment: this.comment
            }, {
              headers: {
                token: this.token
              }
            })
            .then(() => {
              axios.patch(`${this.baseURL}offer/${this.offer.id}`, {
                status: 'RETURNED'
              }, {
                headers: {
                  token: this.token
                }
              })
              .then(res => {
                this.offer = res.data;
              })
              .catch(err => console.log(err));

              swal({
                text: "Đã trả thành công. Đợi chủ xe xác nhận.",
                icon: "success",
              });
              this.$emit("fetchData");
            })
            .catch(err => {
              console.log(err);
              swal({
                text: err.message,
                icon: "error",
              });
            })    
          }
        });
      },
    },
    computed: {
      imageUrls() {
        return this.offer.vehicle.imageUrl.slice(1);
      },
    },
    mounted() {
      this.id = this.$route.params.id;
      this.token = localStorage.getItem("token");
      this.fetchOffer();
    }
  }
</script>
<style scoped>
  h2 {
    padding-left: 15px;
  }

  h2, h3, h5 {
    font-weight: 700;
  }

  .card-shadow {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.3);
  }

  .note {
    text-align: left;
    font-size: 18px;
    line-height: 28px;
  }

  img.motor {
    aspect-ratio: 3 / 2;
  }

  abbr {
    text-decoration: none !important;
  }

  #map { 
    height: 300px;
    margin: 0 -1.25rem -1.25rem;
  }

  .col-12 > span {
    font-size: 18px;
  }

  .sticky-card {
    position: sticky;
    top: 20px;
  }

  /* @media (min-width: 576px) {
    .modal-dialog {
      max-width: 700px;
    }
  } */

  .star {
    margin: 0 7px;
    opacity: 0.3;
    cursor: pointer;
  }

</style>