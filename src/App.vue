<template>
  <Navbar
    v-if="!['Signup', 'Signin'].includes($route.name)"
  />
  <div style="min-height: 60vh">
    <router-view
      v-if="motors"
      :baseURL="baseURL"
      :motors="motors"
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
        .get(this.baseURL + 'motor')
        .then((res) => this.motors = res.data)
        .catch((err) => console.log(err));


    //   //fetch cart items
    //   if (this.token) {
    //     await axios.get(`${this.baseURL}cart/?token=${this.token}`).then(
    //       (response) => {
    //         if (response.status == 200) {
    //           // update cart
    //           this.cartCount = Object.keys(response.data.cartItems).length;
    //         }
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   }

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
