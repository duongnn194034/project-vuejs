<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="motor.imageUrl"
        alt="Motor Image"
      />
    </div>
    <div class="card-body">
      <router-link :to="{ name: 'ShowDetails', params: { id: motor?.id } }"
        ><h5 class="card-title">{{ motor.model }}</h5></router-link
      >
      <p class="card-text">{{ motor.price }}<sup>VND</sup></p>
      <p class="card-text font-italic">
        {{ motor.note }}...
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MotorBox",
  props: ["motor"],
  methods: {
    showDetails() {
      this.$router.push({
        name: "ShowDetails",
        params: { id: this.motor?.id },
      });
    },
  },
  mounted() {
    
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
</style>
