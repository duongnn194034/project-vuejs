<template>
  <div id="home">
    <!-- Page Wrapper -->
    <div id="background-div" class="page-holder bg-cover">

      <div class="container py-5">
        <h1 class="pt-3 text-center text-custom" id="heading">Local vehicle hire</h1>
        <h3 class="pt-3 text-center text-custom" id="heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
        <header class="text-center text-white py-5">
          <h3 class="mb-4 rounded"><a href="#start-shopping" class="bg-white px-2 py-2 rounded" id="heading">Start</a></h3>
        </header>
      </div>
    </div>

    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Search by Location</h2>
        </div>
      </div>
      <div class="row">
        <div class=""></div>
      </div>
    </div>
    <hr>
    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Popular Motors</h2>
        </div>
      </div>
      <div class="row">
      </div>
    </div>
  </div>
</template>

<script>
  import MotorBox from "../components/Vehicle/MotorBox.vue";
  import CategoryBox from "../components/Category/CategoryBox";
  export default {
    name: 'Home',
    components : { MotorBox, CategoryBox },
    props : ["baseURL", "products", "categories"],
    data(){
      return{
        category_size:0,
        product_size:0
      }
    },
    mounted(){

    }
  }
</script>

<style>
  .page-holder {
    min-height: 100vh;
  }

  .bg-cover {
    background-size: cover !important;
  }

  #background-div {
    background: url(../assets/home.png)
  }

  #heading {
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    opacity: 0.8;
    font-family: 'Josefin Sans', sans-serif;
  }

  .text-custom {
    color: #3d0080;
  }

  #content {
    opacity: 0.8;
  }

  h2 {
    font-family: 'Josefin Sans', sans-serif;
  }
</style>
