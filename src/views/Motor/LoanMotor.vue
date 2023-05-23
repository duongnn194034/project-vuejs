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
            <div class="form-control map" id="map"></div>
            <input class="form-control map" type="text" placeholder="Search your address here." v-model="address">
          </div>
          <div class="form-group col-12">
            <label>Max Distance</label>
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
        radius: 0,
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
      }
    },
    mounted() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({ name: 'Home'});
        return;
      }
      var map = L.map('map').setView([0, 0], 15);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 15,
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

div.map {
  margin: 0;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

input.map {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style>