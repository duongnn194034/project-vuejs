<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ title }}</h2>
    </div>
    <div class="row pt-3">
      <div class="col-md-7 col-xs-12">
        <div class="card w-100 card-shadow">
          <div class="image-container">
            <div id="carouselMotorControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img width="900" height="600" :src="motor.imageUrl[0]" :alt="motor.model" class="img-fluid motor"/>
                </div>
                <div class="carousel-item" v-for="item in imageUrls">
                  <img width="900" height="600" :src="item" :alt="motor.model" class="img-fluid motor"/>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselMotorControls" role="button" data-slide="prev" v-if="motor.imageUrl.length > 1">
                <span class="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselMotorControls" role="button" data-slide="next" v-if="motor.imageUrl.length > 1">
                <span class="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="card-body bg-secondary text-white">
            <h3>Chú ý của chủ xe</h3>
            <p class="note">{{ motor.note }}</p>
          </div>
          <div class="card-body">
            <section>
              <dl>
                <div class="row">
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Hãng</dt>
                    <dd>{{ motor.production }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Loại xăng</dt>
                    <dd>{{ motor.fuel }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Mẫu</dt>
                    <dd>{{ motor.model }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Loại xe</dt>
                    <dd>{{ motor.type }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Dung tích</dt>
                    <dd>{{ motor.engineSize }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Năm</dt>
                    <dd>{{ motor.year }}</dd>
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
                  <span>Tuổi tối thiểu: {{ motor.minAge }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Số năm kinh nghiệm lái tốt thiểu: {{ motor.minDriving }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Thời gian thuê tối thiểu: {{ toDateString(motor.minDur) }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Thời gian thuê tối đa: {{ toDateString(motor.maxDur) }}</span>
                </div>
              </div>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Nơi nhận xe</h5>
              <div id="map"></div>
            </section>
          </div>
        </div>
        <div class="card w-100 no-bg owner">
          <section class="bg-success profile">
            <div class="row m-0 image-row">
              <ImageCircle :image="{ url: this.user.avatarUrl, name: 'avatar'}" :option2="true"/>
            </div>
            <div class="row m-0 name">
              <p class="text-left" itemprop="name">
                <router-link :to="{ name: 'UserProfile', params: {id: this.motor.owner?.id} }">{{ motor.owner?.fullName }}</router-link>
              </p>
              <div class="badges hidden-xs">
                <span class="color-white">ID chưa xác minh</span>
              </div>
            </div>
            <div class="row ml-0 mr-0 mt-3 details">
              <div class="col-lg-5 col-sm-4 col-xs-12">
                <p class="text-left no-margin">
                 {{ createdAt }}
                </p>
              </div>
              <div class="col-lg-4 col-sm-4 col-xs-12 border-white">
                <p class="no-margin">SĐT: {{ this.motor.owner?.phoneNumber }}</p>
              </div>
              <div class="col-lg-3 col-sm-3 col-xs-12 border-white">
                <div class="row">
                  <a :href="this.motor.owner?.facebookUrl" target="_blank">
                    <img src="../../assets/facebook.png" alt="fb" class="contact" v-if="this.motor.owner?.facebookUrl">
                  </a>
                  <a :href="this.motor.owner?.zaloUrl" target="_blank">
                    <img src="../../assets/zalo.png" alt="zalo" class="contact" v-if="this.motor.owner?.zaloUrl">
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-white biography">
            <div class="row bio-row">
              <div class="col-12 bio">
                <div class="expanding color-dark-grey text-left padding-bottom-10" itemprop="description">
                  <p>{{ this.motor.owner?.biography }}</p>
                </div>
              </div>
            </div>
          </section>
          <hr>
          <section class="bg-white reviews">
            <div class="row reviews m-0 pt-4">
              <div class="col-12">
                <h5>{{ reviews }}</h5>
              </div>
            </div>
            <div class="row m-0 pt-4">
              <Rate v-for="(rate, index) in motor.ratings" :key="index" :index="index" :review="rate" />
            </div>
          </section>
        </div>
      </div>
      <div class="col-md-5 col-xs-12 pl-5">
        <div class="card w-100 sticky-container card-shadow">
          <Calendar 
            expanded 
            borderless
            :disabled-dates="disabledDates"
            :attributes="attributes" 
          />
          <div class="card-body pt-0">
            <section class="pb-4">
              <h6>Bắt đầu</h6>
              <input type="datetime-local" class="form-control" v-model="startTime" @input="calcPrice"/>
              <h6>Kết thúc</h6>
              <input type="datetime-local" class="form-control" v-model="endTime" @input="calcPrice"/>
            </section>
            <section>
              <div v-show="view == 'price'" id="price" class="d-flex justify-content-around pb-4">
                <span><strong>{{ motor.price }}₫</strong>/giờ</span>
                <span><strong>{{ motor.price * 24 }}₫</strong>/ngày</span>
              </div>
              <Loader v-show="view == 'loading'"/>
              <div class="cost text-center" v-show="view =='cost'">
                <h2><b>{{ cost }}₫</b></h2>
              </div>
              <div class="text-center">
                <button 
                  type="button" 
                  class="btn btn-primary ml-auto btn-full-width border-radius-5 w-50" 
                  :disabled="!valid"
                  @click="goToCheckout"
                  >Thuê xe
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '../../components/Atomic/Loader.vue';
import ImageCircle from '../../components/Image/ImageCircle.vue';
import Rate from '../../components/Rate/Rate.vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import swal from 'sweetalert';
export default {
  data() {
    return {
      id: null,
      token: null,
      attributes: [],
      startTime: null,
      endTime: null,
      disabledDates: null,
      dates: [],
      motor: { 
        imageUrl: [],
        feature: {
          others: []
        }
      },
      features: [],
      toolTip: {
        "Fuel Cost": "Xăng cần đổ lại đúng như khi mượn.",
        "Damage Insurance": "Đã bao gồm bảo hiểm xe.",
        "Stolen Insurance": "Đã bao gồm bảo hiểm mất cắp.",
        "Order Canceling": "Việc thuê xe có thể hủy trong 48h trước thời hạn.",
        "Adjust": "Đã tính thuế và phí phụ.",
      },
      view: "price",
      valid: false,
      cost: 0,
    };
  },
  props: ["baseURL", "user"],
  components: { Calendar, DatePicker, Loader, ImageCircle, Rate },
  methods: {
    async fetchData() {
      await axios
        .get(`${this.baseURL}motor/${this.id}`)
        .then((res) => {
          this.motor = res.data;
          for (let key in this.motor.feature) {
            if (this.motor.feature[key] == true) {
              this.features.push(this.stringfy(key));
            }
          }
          if (this.motor.feature.others) {
            this.features = this.features.concat(this.motor.feature.others);
          }
          var map = L.map('map').setView([this.motor.location.y, this.motor.location.x], 12);
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              maxZoom: 20,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          var circle = L.circle([this.motor.location.y, this.motor.location.x], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: this.motor.radius ? this.motor.radius * 1000 : 1000
          }).addTo(map);
        })
        .catch((err) => console.log(err));
    },

    async fetchDate() {
      await axios
        .get(`${this.baseURL}offer/motor/${this.id}`)
        .then(res => {
          if (!res.data) return;
          res.data.forEach(element => {
            if (element.status != 'ĐÃ HỦY') {
              this.dates.push([new Date(element.startTime), new Date(element.endTime)]);
            }
          });
          this.attributes.push({
            key: "busy",
            highlight: "red",
            dates: this.dates,
            popover: {
              label: "Không khả dụng"
            } 
          });
        })
        .catch(err => console.log(err));
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
        res = res + ' 1 ngày ';
      }
      if (hour > 1) {
        res = res + hour + ' giờ'
      } else {
        res = res + hour + ' giờ';
      }
      return res;
    },

    calcPrice() {
      if (this.startTime != null && !this.checkDate(new Date(this.startTime)) 
        || this.endTime != null && !this.checkDate(new Date(this.endTime))
      ) {
        this.warn("Motorbike is already rented at this time.")
      }
      if (this.startTime == null || this.endTime == null) return;
      const duration = new Date(this.endTime).getTime() - new Date(this.startTime).getTime();
      if (duration < this.motor.minDur || (this.motor.maxDur > 0 && duration > this.motor.maxDur)) {
        this.valid = false;
        this.warn("Duration is invalid.")
        return;
      }
      this.view = 'loading';
      this.cost = this.motor.price * duration / 3600000;
      this.view = 'cost';
      this.valid = true;
    },

    warn(content) {
      const price = document.getElementById("price");
      const warning = document.createElement("div");
      warning.innerText = content;
      warning.setAttribute("class", "alert alert-warning alert-dismissible fade show")
      warning.setAttribute("role", "alert");
      const close = document.createElement("button");
      close.setAttribute("type", "button");
      close.setAttribute("class", "close");
      close.setAttribute("data-dismiss", "alert");
      close.setAttribute("aria-label", "Close")
      close.innerHTML = '<span aria-hidden="true">&times;</span>';
      warning.appendChild(close);
      price.insertAdjacentElement("afterend", warning);
    },

    checkDate(date) {
      this.dates.forEach(element => {
        if (element[0] <= date && element[1] >= date) {
          return false;
        }
      });
      return true;
    },

    goToCheckout() {
      if (!this.token) {
        swal({
          icon: "warning",
          text: "Bạn phải đăng nhập trước. Đăng nhập ngay?",
          buttons: {
            confirm: {
              text: "OK",
              value: "OK"
            },
            cancel: true,
          }}).then(value => {
            if (value == 'OK') {
              this.$router.push({ name: 'Signin' });
            }
          });
      } else {
        localStorage.setItem("vehicleId", this.motor.id);
        localStorage.setItem("userId", this.user.id);
        localStorage.setItem("start", this.startTime);
        localStorage.setItem("end", this.endTime);
        localStorage.setItem("price", this.cost.toString());
        this.$router.push({ name: 'Checkout'})
      }
    },
  },
  computed: {
    title() {
      return `${this.motor.production} ${this.motor.model} ${this.motor.year}`;
    },
    imageUrls() {
      return this.motor.imageUrl.slice(1);
    },

    createdAt() {
      const createdDate = new Date(this.motor.owner?.createdAt).toLocaleDateString();
      return `Thành viên từ ${createdDate}`; 
    },

    reviews() {
      const rev = this.motor.ratings?.length
      if (rev > 1) {
        return `Có ${rev} đánh giá.`
      } else {
        return `Có ${rev} đánh giá.`
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    this.disabledDates = { end: yesterday };
    this.fetchData();
    this.fetchDate();
    this.token = localStorage.getItem("token");
  }
};
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

.sticky-container {
  position: sticky;
  top: 20px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

section h6 {
  padding-bottom: 0.3rem;
  padding-top: 0.5rem;
  font-size: 18px;
}

.image-box{
  width: 150px !important;
  height: 150px !important;
  border-radius: 75px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  float: left;
  margin-right: 20px;
  margin-top: -90px;
  position: absolute;
  width: 154px;
  z-index: 1;
}

.owner {
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
  line-height: 30px;
  margin: 130px 0 20px;
}

section.profile {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

section.reviews {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.m-0 > p.text-left {
  display: inline-block;
  font-size: 25px;
  font-weight: 700;
  margin: 85px 20px 5px;
  color: white;
}

.m-0 > .badges {
  display: inline-block;
  font-size: 18px;
  margin: 85px 20px 5px;
  color: white;
}

.details > div, .details > p {
  display: inline-block;
  font-size: 18px;
  color: white;
}

.border-white {
  border-left: 1px solid white;
}

.bio-row {
  margin: 20px 0 0;
}

.reviews h3 {
  font-size: 25px;
  text-align: left;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: #fff;
}

img.contact {
  height: 40px;
  width: 40px;
  margin-left: 1rem;
}
</style>