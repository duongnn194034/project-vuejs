<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="text-center">My Bookings</h3>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <ul class="nav">
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'upcoming' }}" class="nav-link" id="upcoming" 
              @click="linkHandler">Upcoming</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'completed' }}" class="nav-link" id="completed"
              @click="linkHandler">Completed</router-link>
          </li>
          <li class="nav-item pb-0">
            <router-link :to="{ name: 'MyOffers', query: { filter: 'all' }}" class="nav-link" id="all"
              @click="linkHandler">All</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 my-3" v-for="offer in offers">
        <div class="card w-100">
          <div class="image-container">
            <img
              class="card-img-top"
              :src="offer.vehicle.imageUrl?.length ? offer.vehicle.imageUrl[0] : 
              'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'"
              alt="Motor Image"
            />
          </div>
          <div class="card-body">
            <div class="details-container clearfix">
              <div class="d-flex align-items-center justify-content-between">
                <router-link :to="{ name: 'ShowDetails', params: { id: offer.vehicle.id } }"
                  ><h5 class="card-title">{{ offer.vehicle.model }}</h5></router-link>
                <span class="badge badge-success" v-if="!offer.status || offer.status == 'returned'">Completed</span>
              </div>
              <div class="info-container">
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Start time: </b></span>
                  <span>{{ new Date(offer.startTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>End time:</b></span>
                  <span>{{ new Date(offer.endTime).toLocaleString() }}</span>
                </div>
                <div class="d-flex align-items-center">
                  <img class="clock" src="../../assets/clock.png" alt="clock">
                  <span class="mr-1"><b>Booking time: </b></span>
                  <span>{{ new Date(offer.createdDate).toLocaleString() }}</span>
                </div>
              </div>
            </div>
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
        active: 'upcoming',
        bookings: [],
        offers: [],
      }
    },
    props: ['baseURL'],
    name: 'MyOffers',
    methods: {
      linkHandler(e) {
        e.preventDefault();
        this.active = e.target.id;
        document.getElementsByClassName("active")[0].setAttribute("class", "nav-link");
        e.target.setAttribute("class", "nav-link active");
      },

      async fetchOffer() {
        await axios.get(`${this.baseURL}offer/list`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          this.bookings = this.bookings.concat(res.data);
          this.filter();
        })
        .catch(err => console.log(err));
      },

      filter() {
        switch(this.active) {
          case 'all': 
            this.offers = this.bookings;
            break;
          case 'upcoming':
            this.offers = this.bookings.filter(booking => booking.endTime > new Date());
            break;
          case 'completed':
            this.offers = this.bookings.filter(booking => booking.endTime <= new Date());
            break;
        }
      }
    },
    watch: {
      active() {
        this.filter();
      }
    },
    mounted() {
      if (this.$route.query.filter) {
        this.active = this.$route.query.filter;
      }
      document.getElementById(this.active).setAttribute("class", "nav-link active");
      this.fetchOffer();
      this.filter();
    }
  }
</script>
<style scoped>
  .active {
      font-weight: bold;
      cursor: pointer;
  }

  .card {
    background-color: white;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
  }

  a {
    text-decoration: none;
    color: black;
  }

  img.clock {
    height: 18px;
    margin-right: 5px;
  }
</style>