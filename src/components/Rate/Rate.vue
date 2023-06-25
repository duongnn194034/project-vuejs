<template>
  <div class="col-sm-12 review py-3">
    <h6><b>{{ review.username }}</b></h6>
    <div class="row">
      <div class="col-4">{{ new Date(review.createdDate).toLocaleDateString() }}</div>
      <div class="star-container col-8">
        <div class="stars">
          <img class="star" src="../../assets/star.svg"
            v-if="this.stars > 0" 
            v-for="index in (this.stars > 0 ? this.stars : 1)" :key="index"
          >
          <img class="star opaque" src="../../assets/star.svg" 
            v-if="this.opaqueStars > 0" 
            v-for="index in (this.opaqueStars > 0 ? this.opaqueStars : 1)" :key="index"
          >
        </div>
      </div>
      <div class="col-12">
        <p>{{ comment }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Review',
    props: ["review", "index"],
    data() {
      return {
        stars: 0,
        opaqueStars: 5,
        comment: null,
      }
    },
    mounted() {
      this.stars = this.review.rating ? this.review.rating : 0;
      this.opaqueStars = 5 - this.stars;
      if (this.index % 2 == 0) {
        const div = document.getElementsByClassName("review")[this.index];
        div.setAttribute("style", "background-color: #eee;");
      }
      this.comment = '\"' + this.review.comment + '\"';
    }
}
</script>
<style scoped>
  .star {
    width: 17px;
    height: 17px;
    margin-right: 2px;
  }

  .opaque {
    opacity: 0.2;
  }
</style>