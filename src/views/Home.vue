<template>
  <div class="loader" v-if="loading"></div>
  <div id="home" v-else @click="close">
    <!-- Page Wrapper -->
    <div id="background-div" class="page-holder bg-cover">

      <div class="container py-5">
        <h1 class="pt-3 text-center text-custom" id="heading">AAA</h1>
        <h3 class="pt-3 text-center text-custom" id="heading">Nơi chia sẻ xe máy của bạn.</h3>
        <header class="text-center text-white py-5">
          <h3 class="mb-4 rounded"><a href="#start-shopping" class="bg-white px-2 py-2 rounded" id="heading">Bắt đầu</a></h3>
        </header>
      </div>
    </div>

    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Tìm theo địa điểm</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-xs-12 no-padding input-group">
          <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12 no-padding margin-bottom-5 padding-right-10-sm padding-right-10-md">
            <input type="text" class="search form-control" placeholder="Nhập địa chỉ hoặc mã bưu điện" v-model="query" autocomplete="off" @submit="submit">
            <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-if="this.suggest">
              <div v-for="(address, index) in this.suggestedAddress" :key="index">
                <router-link class="text-decoration-none text-dark" :to="{ name: 'ListMotors', query: { query: address.display_name, lat: address.lat, lon: address.lon }}">
                  <strong>{{ address.display_name }}</strong>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-md-offset-0 col-sm-3 col-md-2 col-xs-12 no-padding margin-bottom-5">
            <button type="submit" class="btn btn-purple btn-full-width border-radius-5" @click="submit">Tìm xe</button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Xe phổ biến:</h2>
        </div>
      </div>
        <div id="carouselMotorControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div v-for="index in this.indexs" :key="index" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                  <MotorBox :motor="motors[index-1]">
                  </MotorBox>
                </div>
              </div>
            </div>
            <div class="carousel-item" v-for="item in this.activeIndexs">
              <div class="row">
                <div v-for="index in item" :key="index" class="col-md-6 col-xl-4 col-12 pt-3  justify-content-around d-flex">
                  <MotorBox :motor="motors[index-1]">
                  </MotorBox>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselMotorControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselMotorControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import MotorBox from "../components/Vehicle/MotorBox.vue";
  export default {
    name: 'Home',
    components : { MotorBox },
    props : ["baseURL", "motors", "categories"],
    data() {
      return{
        indexs: [],
        activeIndexs: [],
        query: '',
        suggest: false,
        suggestedAddress: [],
        loading: false,
      }
    },
    methods: {
      setUpArray() {
        const carouselPage = 3;
        let var1 = Math.floor(this.motors.length / carouselPage);
        let var2 = this.motors.length % carouselPage;
        let array = [];
        for (let i = 0; i < var1; i++) {
          let arr = [];
          for (let j = 1; j <= carouselPage; j++) {
            arr.push(j + carouselPage * i);
          }
          array.push(arr);
        }
        let tempArr = []
        for (let i = var2 - 1; i >= 0; i--) {
          tempArr.push(this.motors.length - i);
        }
        if (var2) {
          array.push(tempArr);
        }
        this.indexs = array[0];
        if (array.length > 1) {
          this.activeIndexs = array.slice(1);
        }
      },
      async fetchAddress(query) {
        await axios
          .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`)
          .then((res) => {
            if (query == this.query) {
              this.suggestedAddress = res.data;
            }
          })
          .catch((err) => console.log(err));
      },
      async submit() {
        if (!this.query) return;
        this.loading = true;
        await axios
          .get(`https://nominatim.openstreetmap.org/search?q=${this.query}&format=json&limit=1`)
          .then((res) => {
            this.$router.push({ name: 'ListMotors', query: { query: this.query, lat: res.data[0].lat, lon: res.data[0].lon }})
          })
          .catch((err) => console.log(err));
      },
      close(event) {
        if (event.target.tagName != 'router-link' && event.target.id != 'autocomplete-list') {
          this.suggest = false;
        }
      } 
    },
    watch: {
      query: {
        handler(newQuery) {
          this.fetchAddress(newQuery);
          this.suggest = true;
        },
        immediate: true
      }
    },
    mounted(){
      this.setUpArray();
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

  .carousel-control-prev {
    justify-content: left;
    left: -10px;
    width: 20px;
  }

  .carousel-control-next {
    justify-content: right;
    right: -10px;
    width: 20px;
  }

  #background-div {
    background: url(../assets/home2.jpg)
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

  .btn-purple {
    background-color: #7a00ff;
    border: 1px solid #7a00ff;
    box-shadow: 0 0 20px 1px rgba(0,0,0,.1);
    color: #fff
  }

  .btn-purple:active,.btn-purple:focus,.btn-purple:hover {
    background-color: #490099;
    border-color: #490099;
    color: #fff
  }

  .input-group {
    float: left;
    margin-bottom: 5%;
    margin-top: 5%;
    position: relative;
    width: 100%;
    z-index: 2;
    margin-left: 20%
  }

  .autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 15px;
  right: 15px;
  top: 100%;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }

  .loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: absolute;
  margin-left: calc(50% - 60px);
  margin-top: calc(30vh - 60px);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
