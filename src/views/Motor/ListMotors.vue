<template>
  <div class="loader" v-if="loading"></div>
  <div class="container-fluid body" v-else>
    <div class="row mt-4">
      <div class="col-xs-12 col-md-5 no-padding">
        <input class="form-control location-input" type="text" placeholder="Địa chỉ hoặc mã bưu điện" v-model="query" @input="input">
        <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-show="this.suggest">
          <div v-for="(ad, index) in this.suggestedAddress" :key="index" @click="select">
            <strong>{{ ad.display_name }}</strong>
            <input type="hidden" :value="index">
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 no-padding">
        <div class="input-group m-0">
          <DatePicker v-model="pickUp">
            <template #default="{ togglePopover }">
              <input
                class="form-control datetime-input-1 col-md-4"
                type="text"
                placeholder="Ngày bắt đầu"
                :value="pickUp?.toLocaleDateString()"
                readonly
                @click="togglePopover"
              >
            </template>
          </DatePicker>
          <select class="form-control col-md-2" v-model="puTime">
            <option value="-1" selected>--Thời gian--</option>
            <option v-for="(value, index) in timestamp" :value="index">{{ value }}</option>
          </select>
          <DatePicker v-model="dropOff">
            <template #default="{ togglePopover }">
              <input
                class="form-control datetime-input-2 col-md-4"
                type="text"
                placeholder="Ngày trả xe"
                :value="dropOff?.toLocaleDateString()"
                readonly
                @click="togglePopover"
              >
            </template>
          </DatePicker>
          <select class="form-control col-md-2" v-model="doTime">
            <option value="-1" selected>--Thời gian--</option>
            <option v-for="(value, index) in timestamp" :value="index">{{ value }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-1">
          <button type="submit" class="btn btn-purple" @click="click">GO</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">{{ title }}</h4>
      </div>
    </div>

    <div class="row">
      <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry">
      <div class="col-4 pt-3" v-for="motor in motors" :key="motor.content.id">
        <MotorBoxAlt :motor="motor.content" :dist="motor.distance"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import MotorBoxAlt from '../../components/Vehicle/MotorBoxAlt.vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import swal from 'sweetalert';
export default {
  name: 'ListMotors',
  components: { MotorBoxAlt, DatePicker },
  data() {
    return {
      len : 0,
      title: "Kết quả cho: ",
      motors : null,
      loading: true,
      query: null,
      lat: null,
      lng: null,
      pickUp: null,
      dropOff: null,
      puTime: -1,
      doTime: -1,
      timestamp: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', 
    '21:00', '21:30', '22:00', '22:30', '23:00'],
      suggestedAddress: [],
      suggest: false,
    }
  },
  props : [ "baseURL" ],
  methods: {
    async fetchMotor(lat, lon, timestamp) {
      let url = `${this.baseURL}motor/loc?lat=${lat}&lng=${lon}`;
      if (timestamp?.start) url = url + `&start=${timestamp?.start}`
      if (timestamp?.end) url = url + `&end=${timestamp?.end}`
      await axios.get(url)
      .then((res) => {
        this.motors = res.data.content;
        this.len = this.motors ? this.motors.length : 0;
        this.title = "Kết quả cho: " + this.query;
        this.loading = false;
      })
      .catch((error) => console.log(error));
    },

    async click() {
      this.suggest = false;
      this.loading = true;
      if (this.query && (!this.lat || !this.lng)) {
        await axios
        .get(`https://nominatim.openstreetmap.org/search?q=${this.query}&format=json&limit=1`)
        .then((res) => {
          this.lat = res.data[0].lat;
          this.lng = res.data[0].lon;
        })
        .catch((err) => console.log(err));
      }
      let ts = {};
      if (this.pickUp && this.puTime < 0 || !this.pickUp && this.puTime >= 0
        || this.dropOff && this.doTime < 0 || !this.dropOff && this.doTime >=0) {
          swal({
            text: "Chọn cả ngày và giờ",
            icon: "warning",
            closeOnClickOutside: true
          });
          this.loading = false;
          return;
      }
      if (this.pickUp) {
        ts.start = this.pickUp.getTime() + 6 * 3600 * 1000 + this.puTime * 30 * 60 * 1000;
      }
      if (this.dropOff) {
        ts.end = this.dropOff.getTime() + 6 * 3600 * 1000 + this.doTime * 30 * 60 * 1000;
      }
      this.fetchMotor(this.lat, this.lng, ts);
    },

    async fetchAddress(query) {
      await axios
        .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`)
        .then((res) => {
          if (query == this.query) {
            this.suggestedAddress = res.data;
          }
        })
        .catch((err) => console.log(err));
    },

    input() {
      this.suggest = true;
      this.fetchAddress(this.query);
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
        this.suggest = false;
      },
  },
  mounted() {
    let q = this.$route.query;
    this.query = q.query ? q.query : "";
    if (q.lat && q.lon) {
      this.fetchMotor(q.lat, q.lon);
    } else {
      this.loading = false;
    }
  },
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

h5 {
  font-family: 'Roboto', sans-serif;
  color: #686868;
  font-weight: 300;
}

.body {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: absolute;
  margin-left: calc(50% - 60px);
  margin-top: calc(30vh - 60px);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

label {
  position: absolute;
  padding-left: 15px;
  line-height: 50px;
}

.no-padding {
  padding-left: 0;
  padding-right: 0;
}

.form-control, .btn {
  height: 43px !important;
  font-size: 18px;
}

.form-control[readonly] {
  background-color: #fff;
}

.location-input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.datetime-input-1 {
  border-radius: 0;
}

.datetime-input-2 {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
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
