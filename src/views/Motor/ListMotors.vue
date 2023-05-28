<template>
  <div class="loader" v-if="loading"></div>
  <div class="container-fluid body" v-else>
    <div class="row mt-4">
      <div class="col-xs-12 col-md-5 no-padding">
        <input class="form-control location-input" type="text" placeholder="Town, city or Postcode" v-model="query">
      </div>
      <div class="col-sm-12 col-md-7 no-padding">
        <div class="input-group m-0">
          <DatePicker v-model="pickUp">
            <template #default="{ togglePopover }">
              <input
                class="form-control datetime-input-1"
                type="text"
                placeholder="Pick-up time"
                :value="pickUp?.toLocaleDateString()"
                readonly
                @click="togglePopover"
              >
            </template>
          </DatePicker>
          <DatePicker v-model="dropOff">
            <template #default="{ togglePopover }">
              <input
                class="form-control datetime-input-2"
                type="text"
                placeholder="Drop-off time"
                :value="dropOff?.toLocaleDateString()"
                readonly
                @click="togglePopover"
              >
            </template>
          </DatePicker>
        </div>
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
export default {
  name: 'ListMotors',
  components: { MotorBoxAlt, DatePicker },
  data() {
    return {
      len : 0,
      motors : null,
      loading: true,
      query: null,
      pickUp: null,
      dropOff: null,
    }
  },
  props : [ "baseURL" ],
  methods: {

  },
  computed: {
    title() {
      return "Kết quả tìm kiếm cho: " + this.query;
    }
  },
  async mounted() {
    let q = this.$route.query;
    this.query = q.query ? q.query : "";
    if (q.lat && q.lon) {
      await axios.get(`${this.baseURL}motor/loc?lat=${q.lat}&lng=${q.lon}`)
      .then((res) => {
        this.motors = res.data.content;
        this.len = this.motors ? this.motors.length : 0;
        this.loading = false;
      })
      .catch((error) => console.log(error));
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

.form-control {
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
</style>
