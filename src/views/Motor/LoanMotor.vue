<template>
  <div id="loan" class="container-fluid">
    <div class="container">
      <div class="row my-3">
        <div class="form-select col-md-8 col-xs-12">
          <select name="vehicle" id="vehicle" class="form-control" v-model="vehicle">
            <option label="Select Vehicle" selected></option> 
            <option value="Motor">Motor</option>
          </select>
        </div>
      </div>
    </div>
    <section v-show="vehicle == 'Motor'">
      <h3 class="py-3 text-center">Add your motorbike</h3>
      <div class="row py-3">
        <div class="float-left" v-for="i in index">
          <label class="ml-5">Motor Images</label>
          <AddImage :baseURL="baseURL"  @addImage="addImage" />
        </div>
      </div>
      <div class="container">
        <form class="row">
          <div class="form-group col-md-6">
            <label>Production name</label>
            <input type="text" class="form-control" v-model="production" required>
          </div>
          <div class="form-group col-md-6">
            <label>Model</label>
            <input type="text" class="form-control" v-model="model" required>
          </div>
          <div class="form-group col-md-4">
            <label>License Plate</label>
            <input type="text" class="form-control" v-model="license" required>
          </div>
          <div class="form-group col-md-4">
            <label>Engine Size</label>
            <input type="text" class="form-control" v-model="engineSize" required>
          </div>
          <div class="form-group col-md-4">
            <label>Fuel</label>
            <input type="text" class="form-control" v-model="fuel" required>
          </div>
          <div class="form-group col-md-4">
            <label>Type</label>
            <select class="form-control" v-model="type" required>
              <option value="AUTOMATIC">AUTOMATIC</option>
              <option value="MANUAL">MANUAL</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label>Price</label>
            <input type="number" class="form-control" v-model="price" required>
          </div>
          <div class="form-group col-md-4">
            <label>Year</label>
            <input type="number" class="form-control" v-model="year">
          </div>
          <div class="form-group col-12">
            <label>Address</label>
            <div id="map"></div>
            <input class="form-control map" type="text" placeholder="Search your address here." v-model="query" @input="input">
            <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-if="this.suggest">
              <div v-for="(ad, index) in this.suggestedAddress" :key="index" @click="select">
                <strong>{{ ad.display_name }}</strong>
                <input type="hidden" :value="index">
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Max Distance (km)</label>
            <input class="form-control" type="number" v-model="radius">
          </div>
          <div class="form-group col-12">
            <label>Note</label>
            <textarea v-model="note" name="note" id="note" cols="12" rows="5" class="form-control"></textarea>
          </div>
          <div class="row">
            <label class="col-12">Feature</label>
            <div class="form-group col-md-6">
              <label for="minAge">Minimum Age</label>
              <input type="number" class="form-control" id="minAge" placeholder="Age" v-model="minAge">
            </div>
            <div class="form-group col-md-6">
              <label>Minimum Driving</label>
              <input type="number" class="form-control" v-model="minDriving" required>
            </div>
            <div class="form-group col-md-6">
              <label>Minimum Duration</label>
              <input type="number" class="form-control" v-model="minDur" required>
            </div>
            <div class="form-group col-md-6">
              <label>Maximum Duration</label>
              <input type="number" class="form-control" v-model="maxDur" required>
            </div>
            <div class="form-group col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="damageInsurance" v-model="dI">
                <label class="form-check-label" for="damageInsurance">
                  Damage Insurance included.
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="stolenInsurance" v-model="sI">
                <label class="form-check-label" for="stolenInsurance">
                  Stolen Insurance included.
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="orderCanceling" v-model="oC">
                <label class="form-check-label" for="orderCanceling">
                  Order can be cancel at least 2 days before.
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="fuelCost" v-model="fC">
                <label class="form-check-label" for="fuelCost">
                  Fuel cost included.
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="adjust" v-model="aJ">
                <label class="form-check-label" for="adjust">
                  Tax, other charge included.
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="others" v-model="oCheck">
                <label class="form-check-label" for="others">
                  Others.
                </label>
                <input class="form-control" type="text" placeholder="List other features, seperated by commas." 
                  :disabled="!oCheck"
                  v-model="others"
                >
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="submit">Confirm</button>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import AddImage from '../../components/Image/AddImage.vue';
import swal from 'sweetalert';
export default {
    data() {
      return {
        vehicle: "",
        index: 1,
        URLs: [],
        type: null,
        production: null,
        model: null,
        license: null,
        engineSize: null,
        fuel: null,
        price: 0,
        year: null,
        note: null,
        dI: false,
        sI: false,
        fC: false,
        oC: false,
        aJ: false,
        oCheck: false,
        others: null,
        minAge: 0,
        minDriving: 0,
        minDur: null,
        maxDur: null,
        address: null,
        lng: 0,
        lat: 0,
        radius: 0,
        suggest: false,
        query: "",
        suggestedAddress: [],
      } 
    },
    props: ["baseURL"],
    name: 'LoanMotor',
    components: { AddImage },
    methods: {
      addImage(url) {
        this.index = this.index + 1;
        this.URLs.push(url);
      },
      async submit() {
        await axios.post(`${this.baseURL}offer`,
        {
          production: this.production,
          model: this.model,
          type: this.type,
          price: this.price,
          license: this.license,
          engineSize: this.engineSize,
          fuel: this.fuel,
          year: this.year,
          note: this.note,
          imageUrl: this.URLs,
          address: this.address,
          radius: this.radius,
          lng: this.lng,
          lat: this.lat,
          feature: {
            damageInsurance: this.dI,
            stolenInsurance: this.sI,
            adjust: this.aJ,
            orderCanceling: this.oC,
            fuelCost: this.fC,
            minAge: this.minAge,
            minDriving: this.minDriving,
            minDur: this.minDur,
            maxDur: this.maxDur
          }
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          swal({
            text: res.data.message,
            icon: "success",
            closeOnClickOutside: true
          });
          this.$router.push({ name: "YourMotors"});
        })
        .catch(err => console.log(err));
      },
      async fetchAddress(query) {
        await axios
          .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=3`)
          .then((res) => {
            this.suggestedAddress = res.data
          })
          .catch((err) => console.log(err));
      },
      select(event) {
        let index = 0;
        if (event.target.lastChild.value != undefined) {
          index = event.target.lastChild.value;

        } else {
          index = event.target.parentNode.lastChild.value;
        }
        this.query = this.suggestedAddress[index].display_name;
        this.lat = this.suggestedAddress[index].lat;
        this.lng = this.suggestedAddress[index].lon;
        this.address = this.query;
        this.suggest = false;
      },
      input(event) {
        this.suggest = true;
        this.fetchAddress(this.query);
      }
    },
    mounted() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({ name: 'Home'});
        return;
      }
      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }
}
</script>
<style scoped>
.form-group > label, label.col-12 {
  font-size: 18px;
  font-weight: 300;
}

.col-md-6 > label {
  font-size: 16px !important;
}

#map {
  margin: 0 !important;
}

input.map {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 15px;
  right: 15px;
  top: 100%;
  border: 2px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 2px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>