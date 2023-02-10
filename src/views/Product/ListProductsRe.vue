<template>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h4 class="pt-3">{{ title }}</h4>
          <h5>{{msg}}</h5>
        </div>
      </div>
  
      <div class="row">
        <img v-show="len == 0" class="img-fluid" src="../../assets/sorry.jpg" alt="Sorry">
        <div class="col-2" v-for="product in prods" :key="product?.id">
          <ProductBox :product="product"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProductBox from '../../components/Product/ProductBox.vue';
  export default {
    name: 'ListProductsRe',
    data() {
      return {
        title: "Results for: ",
        query : null,
        len : 0,
        msg : null,
        prods : null
      }
    },
    components : {ProductBox},
    props : [ "baseURL" , "products"],
    mounted() {
        this.query = this.$route.params.query
        this.title = this.title.concat(this.query)
        this.prods = this.products.filter((prod) => {return prod?.name?.toLowerCase().includes(this.query.toLowerCase())})  
        this.len = this.prods.length;
        if(this.len == 0) {
            this.msg = "Sorry, no products found";
        } else if(this.len == 1) {
            this.msg = "Only 1 product found";
        } else {
            this.msg = this.len + " products found";
        }
    },
  }
  </script>
  
  <style scoped>
  h4 {
    font-family: 'Roboto', sans-serif;
    color: #484848;
    font-weight: 700;
  }
  
  h5 {
    font-family: 'Roboto', sans-serif;
    color: #686868;
    font-weight: 300;
  }
  </style>
  