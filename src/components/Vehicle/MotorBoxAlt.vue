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
          <span><strong>{{ motor.price }}VND</strong>/giờ</span>
        </div>
        <router-link :to="{ name: 'ShowDetails', params: { id: motor?.id } }"
          ><h5 class="card-title">{{motor.production}} {{ motor.model }} {{ motor.year }}</h5></router-link
        >
        <div class="info-container">
          <img src="../../assets/geopin-dark-grey.svg" alt="geopin" id="icon">
          <span class="pr-2">{{ this.rounded(dist.value) }} {{ dist.unit }} - </span>
          <span class="pr-2">{{ this.motor.type }} - </span>
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
        <hr>
        <div class="feature-container">
          <span class="h6 d-block ml-3"><strong>Thông tin phụ</strong></span>
          <button 
            v-for="key in this.features" 
            :key="key" 
            type="button" class="btn btn-secondary ml-2 mb-2" 
            data-bs-toggle="tooltip" data-bs-placement="right" :title="this.toolTip[key]"
          >
            {{ trans(key) }}
          </button>
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
      features: [],
      stars: 0,
      halfStars: 0,
      opaqueStars: 5,
      toolTip: {
        "Fuel Cost": "Xăng cần đổ lại đúng như khi mượn.",
        "Damage Insurance": "Đã bao gồm bảo hiểm xe.",
        "Stolen Insurance": "Đã bao gồm bảo hiểm mất cắp.",
        "Order Canceling": "Việc thuê xe có thể hủy trong 48h trước thời hạn.",
        "Adjust": "Đã tính thuế và phí phụ.",
      }
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
      return Math.round((decimal + Number.EPSILON) * 100) / 100;
    },

    stringfy(string) {
      return string
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
    },

    trans(key) {
      switch (key) {
        case 'Order Canceling':
          return 'Hủy đặt sớm';
        case 'Adjust':
          return 'Phụ phí ngoài';
        case 'Fuel Cost':
          return 'Không bao gồm giá xăng';
        case 'Stolen Insurance':
          return 'Bảo hiểm mất cắp';
        case 'Damage Insurance':
          return 'Bảo hiểm hư hại';
        default:
          return key;
      }
    },
  },
  computed: {
    imageURL() {
      let url = this.motor.imageUrl;
      if (url == null || url == undefined || !url.length) {
        return "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
      } else {
        return url[0];
      }
    }
  },
  mounted() {
    this.calStar(this.motor.ratingScore);
    for (let key in this.motor.feature) {
      if (this.motor.feature[key] == true) {
        this.features.push(this.stringfy(key));
      }
    }
    if (this.motor.feature.others) {
      this.features = this.features.concat(this.motor.feature.others);
    }
  }
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 3 / 2;
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
  vertical-align: middle;
  align-items: center;
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
  z-index: 90;
  border-radius: 5px;
  overflow: visible;
}

.stars {
  margin-right: 5px;
  float: left;
}

.star {
  width: 1rem;
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
