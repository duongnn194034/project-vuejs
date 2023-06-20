<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ motor.model }}</h2>
    </div>
    <div class="row pt-3">
      <div class="col-md-7 col-xs-12">
        <div class="card w-100">
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
            <h3>Owner Note</h3>
            <p class="note">{{ motor.note }}</p>
          </div>
          <div class="card-body">
            <section>
              <dl>
                <div class="row">
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Make</dt>
                    <dd>{{ motor.production }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Fuel</dt>
                    <dd>{{ motor.fuel }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Model</dt>
                    <dd>{{ motor.model }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Vehicle Type</dt>
                    <dd>{{ motor.type }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Engine Size</dt>
                    <dd>{{ motor.engineSize }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Year</dt>
                    <dd>{{ motor.year }}</dd>
                  </div>
                </div>
              </dl>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Vehicle features</h5>
              <div class="row">
                <div class="col-lg-4 col-xs-6 pb-3" v-for="f in features">
                  <span><abbr :title="this.toolTip[f]">{{ f }}</abbr></span>
                </div>
              </div>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Restrictions</h5>
              <div class="row">
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Minimum Age: {{ motor.minAge }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Minimum Driving Years: {{ motor.minDriving }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Minimum Duration: {{ toDateString(motor.minDur) }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Maximum Duration: {{ toDateString(motor.maxDur) }}</span>
                </div>
              </div>
            </section>
            <hr>
            <section>
              <h5 class="pb-3 mt-4">Pick up location</h5>
              <div id="map"></div>
            </section>
          </div>
        </div>
        <div class="card w-100 mt-5">
          <div class="col-xs-12">
            <section class="owner">
              <div class="top bg-primary">

              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-xs-12 pl-5">
        <div class="card w-100 sticky-container">
          <Calendar 
            expanded 
            borderless
            :disabled-dates="disabledDates"
            :attributes="attributes" 
          />
          <div class="card-body pt-0">
            <section class="pb-4">
              <h6>Pick-up</h6>
              <input type="datetime-local" class="form-control" v-model="startTime" @input="calcPrice"/>
              <h6>Drop-off</h6>
              <input type="datetime-local" class="form-control" v-model="endTime" @input="calcPrice"/>
            </section>
            <section>
              <div v-show="view == 'price'" id="price" class="d-flex justify-content-around pb-4">
                <span><strong>{{ motor.price }}₫</strong>/hour</span>
                <span><strong>{{ motor.price * 24 }}₫</strong>/day</span>
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
                  >Offer
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
        "Fuel Cost": "Guest have to refill fuel before returning.",
        "Damage Insurance": "Damage Insurance included.",
        "Stolen Insurance": "Stolen Insurance included.",
        "Order Canceling": "Order can be canceled at least 2 days before ordered date.",
        "Adjust": "Tax, others fee included.",
      },
      view: "price",
      valid: false,
      cost: 0,
    };
  },
  props: ["baseURL", "user"],
  components: { Calendar, DatePicker, Loader, ImageCircle },
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
        .get(`${this.baseURL}offer/${this.id}`)
        .then(res => {
          if (!res.data) return;
          res.data.forEach(element => {
            this.dates.push([new Date(element.startTime), new Date(element.endTime)]);
          });
          this.attributes.push({
            key: "busy",
            highlight: "red",
            dates: this.dates,
            popover: {
              label: "Not available"
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
        res = res + day + ' days ';
      } else if (day > 0) {
        res = res + '1 day ';
      }
      if (hour > 1) {
        res = res + hour + ' hours'
      } else {
        res = res + hour + ' hour';
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
        return true;
      })
    },

    goToCheckout() {
      if (!this.token) {
        swal({
          icon: "warning",
          text: "You must login first. Login now?",
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
    imageUrls() {
      return this.motor.imageUrl.slice(1);
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

<style>
h2 {
  padding-left: 15px;
}

h2, h3, h5 {
  font-weight: 700;
}

.card {
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

.owner {
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
  line-height: 30px;
  margin: 100px 0 20px;
}

.top {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#add-to-cart-button {
  background-color: #febd69;
}

#wishlist-button {
  background-color: #b9b9b9;
  border-radius: 0;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border-radius: 0;
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
</style>