<template>
  <div class="loader" v-if="loading"></div>
  <div class="container-fluid body" v-else>
    <h3 class="text-center mt-3">Your Vehicles</h3>
    <div class="row">
      <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry">
      <div class="col-4 pt-3" v-for="motor in motors" :key="motor.id">
        <MotorBox :motor="motor" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import MotorBox from '../../components/Vehicle/MotorBox.vue';
export default {
  name: 'YourMotors',
  components: { MotorBox },
  data() {
    return {
      len : 0,
      motors : null,
      loading: true,
      query: null,
    }
  },
  props : [ "baseURL" ],
  async mounted() {
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "Home" });
      return;
    }
    await axios.get(`${this.baseURL}motor/list`,
      {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((res) => {
        this.motors = res.data;
        this.len = this.motors?.length;
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
