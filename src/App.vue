<template>
  <Navbar
    v-if="!['Signup', 'Signin'].includes($route.name)"
    :user="user"
  />
  <div style="min-height: 60vh; background-color: #f5f7fa">
    <router-view
      v-if="motors && (!token || user)"
      :baseURL="baseURL"
      :motors="motors"
      :user="user"
      @fetchData="fetchData"
    >
    </router-view>
  </div>
  <Footer v-if="!['Signup', 'Signin'].includes($route.name)" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import axios from 'axios';
export default {
  data() {
    return {
      baseURL: "http://localhost:8080/",
      motors: null,
      key: 0,
      token: null,
      user: null,
    };
  },

  components: { Footer, Navbar },
  methods: {
    async fetchData() {
      // fetch motors
      await axios
        .get(this.baseURL + 'motor?limit=9')
        .then((res) => {
          this.motors = res.data
        })
        .catch((err) => console.log(err));

      // fetch user
      if (this.token) {
        await axios.get(`${this.baseURL}user/get`, {
          headers: {
            token: this.token
          }
        }).then(
          (response) => {
            if (response.status == 200) {
              this.user = response.data
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchData();
  },
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
