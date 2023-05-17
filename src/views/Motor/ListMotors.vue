<template>
  <div class="loader" v-if="loading"></div>
  <div class="container-fluid body" v-else>
    <div class="row">
      <div class="col-xs-12 col-md-5 no-padding pt-4">
        <div>
          <input placeholder="Town, City or Postcode" class="form-control pac-target-input" autocomplete="off">
        </div>
      </div>
      <div class="col-sm-12 col-md-7 dates no-padding bg-white d-flex pt-4">
        <div class="dateBox dtBox row1">
          <label> Pick up date </label>
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
      <div class="col-4" v-for="motor in motors" :key="motor.content.id">
        <MotorBoxAlt :motor="motor.content" :dist="motor.distance"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import MotorBoxAlt from '../../components/Vehicle/MotorBoxAlt.vue';
export default {
  name: 'ListMotors',
  components: { MotorBoxAlt },
  data() {
    return {
      title: "Kết quả tìm kiếm cho: ",
      len : 0,
      motors : null,
      loading: true,
    }
  },
  props : [ "baseURL" ],
  async mounted() {
    let q = this.$route.query;
    this.title = this.title.concat(q.query)
    await axios.get(`${this.baseURL}motor/loc?lat=${q.lat}&lng=${q.lon}`)
      .then((res) => {
        this.motors = res.data.content;
        this.len = this.motors ? this.motors.length : 0;
        this.loading = false;
      })
      .catch((error) => console.log(error));
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
</style>
