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
          <MotorBox :product="product"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MotorBox from '../../components/Vehicle/MotorBox.vue';
  export default {
    name: 'ListProductsRe',
    data() {
      return {
        title: "Kết quả tìm kiếm cho: ",
        query : null,
        len : 0,
        msg : null,
        prods : null
      }
    },
    components : {MotorBox},
    props : [ "baseURL" , "products"],
    mounted() {
        this.query = this.$route.params.query
        this.title = this.title.concat(this.query)
        this.prods = this.products.filter((prod) => {return prod?.name?.toLowerCase().includes(this.query.toLowerCase())})  
        this.len = this.prods.length;
        if(this.len == 0) {
            this.msg = "Không tìm thấy sản phẩm";
        } else if(this.len == 1) {
            this.msg = "Chỉ tìm thấy 1 sản phẩm";
        } else {
            this.msg = "Tìm thấy " + this.len + " sản phẩm";
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
  