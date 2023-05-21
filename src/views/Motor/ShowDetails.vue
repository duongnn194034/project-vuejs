<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ motor.model }}</h2>
    </div>
    <div class="row pt-3">
      <div class="col-md-7 col-xs-12">
        <div class="card w-100 h-100">
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
                  <span>Minimum Age: {{ motor.feature.minAge }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Minimum Driving Years: {{ motor.feature.minDriving }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Minimum Duration: {{ motor.feature.minDur }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Maximum Duration: {{ motor.feature.maxDur }}</span>
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
              <input type="datetime-local" class="form-control" :value="startTime"/>
              <h6>Drop-off</h6>
              <input type="datetime-local" class="form-control" :value="endTime"/>
            </section>
            <section>
              <div class="d-flex justify-content-around pb-4">
                <span><strong>{{ motor.price }}₫</strong>/hour</span>
                <span><strong>{{ motor.price * 24 }}₫</strong>/day</span>
              </div>
              <div class="text-center">
                <button type="button" class="btn btn-primary ml-auto btn-full-width border-radius-5 w-50">Offer</button>
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
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
export default {
  data() {
    return {
      id: null,
      token: null,
      attributes: [],
      startTime: null,
      endTime: null,
      disabledDates: null,
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
      }
    };
  },
  props: ["baseURL"],
  components: { Calendar, DatePicker },
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
          var map = L.map('map').setView([this.motor.location.y, this.motor.location.x], 17);
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              maxZoom: 15,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          var circle = L.circle([this.motor.location.y, this.motor.location.x], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: this.motor.radius ? this.motor.radius : 1000
          }).addTo(map);
        })
        .catch((err) => console.log(err));
    },
    async fetchDate() {
      await axios
        .get(`${this.baseURL}offer/${this.id}`)
        .then(res => {
          let dates = [];
          if (!res.data) return;
          res.data.forEach(element => {
            dates.push([new Date(element.startTime), new Date(element.endTime)]);
          });
          this.attributes.push({
            key: "busy",
            highlight: "red",
            dates: dates,
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
    }
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
    this.startTime = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, -8);
    this.endTime = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, -8);
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

/* .image-container {

} */

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