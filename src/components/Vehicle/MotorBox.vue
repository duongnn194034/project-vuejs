<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="imageURL"
        alt="Motor Image"
      />
    </div>
    <div class="card-body">
      <div class="price btn btn-danger" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <span><strong>{{ motor.price }}<sup>VND</sup>/giờ</strong></span>
      </div>
      <router-link v-if="admin" :to="{ name: 'EditMotor', params: { id: motor?.id } }"
        ><h5 class="card-title">{{ motor.model }}</h5></router-link
      >
      <router-link v-else :to="{ name: 'ShowDetails', params: { id: motor?.id } }"
        ><h5 class="card-title">{{ motor.model }}</h5></router-link
      >
      <div class="address">
        <p class="card-text font-italic">
        {{ motor.address ? motor.address : '...' }}
      </p>
      </div>
      <div class="star-container">
        <div class="stars">
          <img class="star" src="../../assets/star.svg"
            v-if="this.stars > 0" 
            v-for="index in (this.stars > 0 ? this.stars : 1)" :key="index"
          >
          <img class="star" src="../../assets/star-half.svg"
            v-if="this.halfStars > 0" 
            v-for="index in (this.halfStars > 0 ? this.halfStars : 1)" :key="index"
          >
          <img class="star opaque" src="../../assets/star.svg" 
            v-if="this.opaqueStars > 0" 
            v-for="index in (this.opaqueStars > 0 ? this.opaqueStars : 1)" :key="index"
          >
        </div>
        <span class="total">{{ motor.ratingTotal }} đánh giá</span>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "MotorBox",
  props: ["motor", "admin"],
  data() {
    return {
      // address: ''
      stars: 0,
      halfStars: 0,
      opaqueStars: 5
    }
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: "ShowDetails",
        params: { id: this.motor?.id },
      });
    },
    calStar(star) {
      this.stars = Math.round(star);
      if (star - Math.trunc(star) > 0.25 && star - Math.trunc(star) < 0.75) {
        this.halfStars = 1;
      }
      this.opaqueStars = 5 - this.stars - this.halfStars;
    }
  },
  computed: {
    imageURL() {
      if (this.motor.imageUrl == null || this.motor.imageUrl == undefined || !this.motor.imageUrl.length) {
        return "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
      } else {
        return this.motor.imageUrl[0];
      }
    }
  },
  mounted() {
    this.calStar(this.motor.ratingScore);
  }
};
</script>

<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

a {
  text-decoration: none;
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 15px;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

.card-body {
  position: relative;
}

.address {
  display: block;/* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  min-height: 2rem;
  line-height: 1rem;
}

#edit-product {
  float: right;
}

.btn-danger {
    background-color: #e81056;
    border: 1px solid #e81056;
    box-shadow: 0 0 20px 1px rgba(0,0,0,.1);
    color: #fff
}

.price {
  left: 3px;
  top: -25px;
  position: absolute;
  overflow: visible !important;
}
.star-container {
  display: inline-block;
}

.stars {
  margin-right: 5px;
  float: left;
}

.star {
  width: 17px;
  height: 17px;
  margin-right: 2px;
}

.opaque {
  opacity: 0.2;
}

.total {
  vertical-align: middle;
  font-size: 16px;
}
</style>
