<template>
  <Navbar
    v-if="!['Signup', 'Signin'].includes($route.name)"
  />
  <div style="min-height: 60vh">
    <router-view
      :baseURL="baseURL"
      :products="products"
      :categories="categories"
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
      products: null,
      categories: null,
      key: 0,
      token: null,
      user: null,
    };
  },

  components: { Footer, Navbar },
  methods: {
    async fetchData() {
      // fetch offers
      await axios
        .get(this.baseURL + 'rental/motor')
        .then((res) => (console.log(res.data)))
        .catch((err) => console.log(err));

    //   //fetch categories
    //   await axios
    //     .get(this.baseURL + 'category/')
    //     .then((res) => (this.categories = res.data))
    //     .catch((err) => console.log(err));

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
