<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ offer.vehicle.model }}</h2>
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
                    <dt>Make</dt>
                    <dd>{{ offer.vehicle.production }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Fuel</dt>
                    <dd>{{ offer.vehicle.fuel }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6 pb-4">
                    <dt>Model</dt>
                    <dd>{{ offer.vehicle.model }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Vehicle Type</dt>
                    <dd>{{ offer.vehicle.type }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Engine Size</dt>
                    <dd>{{ offer.vehicle.engineSize }}</dd>
                  </div>
                  <div class="col-lg-4 col-xs-6">
                    <dt>Year</dt>
                    <dd>{{ offer.vehicle.year }}</dd>
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
                  <span>Minimum Age: {{ offer.vehicle.minAge }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-3">
                  <span>Minimum Driving Years: {{ offer.vehicle.minDriving }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Minimum Duration: {{ toDateString(offer.vehicle.minDur) }}</span>
                </div>
                <div class="col-lg-6 col-xs-6 pb-4">
                  <span>Maximum Duration: {{ toDateString(offer.vehicle.maxDur) }}</span>
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
    </div>
  </div>
</template>
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        id: null,
        offer: {
          vehicle: {
            imageUrl: [""]
          }
        },
        toolTip: {
          "Fuel Cost": "Guest have to refill fuel before returning.",
          "Damage Insurance": "Damage Insurance included.",
          "Stolen Insurance": "Stolen Insurance included.",
          "Order Canceling": "Order can be canceled at least 2 days before ordered date.",
          "Adjust": "Tax, others fee included.",
        },
      }
    },
    props: ["baseURL"],
    name: 'OfferDetails',
    methods: {
      async fetchOffer() {
        await axios.get(`${this.baseURL}offer/${this.id}`)
          .then(res => {
            this.offer = res.data;
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
    },
    mounted() {
      this.id = this.$route.params.id;
      this.fetchOffer();
    }
  }
</script>
<style scoped>

</style>