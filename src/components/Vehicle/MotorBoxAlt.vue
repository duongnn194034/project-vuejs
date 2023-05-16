<template>
  <div class="card h-100 w-100">
    <div class="image-container">
      <img
        class="card-img-top"
        :src="imageURL"
        alt="Motor Image"
      />
    </div>
    <div class="card-body">
      <div class="details-container clearfix">
        <div class="price btn" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
          <span><strong>{{ motor.price }}VND</strong>/hour</span>
        </div>
        <router-link :to="{ name: 'ShowDetails', params: { id: motor?.id } }"
          ><h5 class="card-title">{{ motor.model }}</h5></router-link
        >
        <div class="info-container">
          <img src="../../assets/geopin-dark-grey.svg" alt="geopin" id="icon">
          <p class="pr-2">{{ this.rounded(dist.value) }} {{ dist.unit }}</p>
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
          <span class="total">{{ motor.ratingTotal }}</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MotorBox",
  props: ["motor", "dist"],
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
    },
    rounded(decimal) {
      return Math.round(decimal * 100) / 100;
    }
  },
  computed: {
    imageURL() {
      if (this.motor.imageUrl == null || this.motor.imageUrl == undefined) {
        return '';
      } else {
        return this.motor.imageUrl;
      }
    }
  },
  mounted() {
    this.calStar(this.motor.ratingScore);
  }
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  overflow: hidden;
}

a {
  text-decoration: none;
}

.card-body {
  padding: 10px 5px
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

#edit-product {
  float: right;
}

.details-container {
  position: relative;
}

.info-container {
  display: flex;
  vertical-align: baseline;
}

.btn-danger {
  background-color: #e81056;
  border: 1px solid #e81056;
  box-shadow: 0 0 20px 1px rgba(0,0,0,.1);
  color: #fff
}

.price {
  right: 0;
  top: -30px;
  position: absolute;
  box-shadow: 0 5px 5px 0 rgba(0,0,0,.1);
  background-color: #eee;
  z-index: 99;
  border-radius: 5px;
  overflow: visible;
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

#icon {
  height: 20px;
}
</style>
