<template>
  <div class="container">
    <div class="row pt-5">
      <h2>{{ motor.model }}</h2>
    </div>
    <div class="row pt-3">
      <div class="col-md-6 col-xs-12">
        <div class="card w-100 h-100">
          <div class="image-container">
            <div id="carouselMotorControls" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img width="900" height="600" :src="motor.imageUrl[0]" :alt="motor.model" class="img-fluid motor"/>
                </div>
                <div class="carousel-item" v-for="item in imageUrls">
                  <img width="900" height="600" :src="item" :alt="motor.model" class="img-fluid motor"/>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouselMotorControls" role="button" data-slide="prev" v-if="motor.imageUrl.length > 1">
                <span class="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselMotorControls" role="button" data-slide="next" v-if="motor.imageUrl.length > 1">
                <span class="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="card-body bg-secondary text-white">
            <h3>Note</h3>
            <p class="note">{{ motor.note }}</p>
          </div>
          <div class="card-body">
            <div class="row w-100">
              <dl>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Make</dt>
                  <dd>{{ motor.production }}</dd>
                </div>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Fuel</dt>
                  <dd>{{ motor.fuel }}</dd>
                </div>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Model</dt>
                  <dd>{{ motor.model }}</dd>
                </div>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Vehicle Type</dt>
                  <dd>{{ motor.type }}</dd>
                </div>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Engine Size</dt>
                  <dd>{{ motor.engineSize }}</dd>
                </div>
                <div class="col-lg-4 col-xs-6 float-left">
                  <dt>Year</dt>
                  <dd>{{ motor.year }}</dd>
                </div>
              </dl>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      token: null,
      motor: { imageUrl: []}
    };
  },
  props: ["baseURL"],
  methods: {
    async fetchMotor() {
      await axios
        .get(`${this.baseURL}motor/${this.id}`)
        .then((res) => {
          this.motor = res.data
        })
        .catch((err) => console.log(err));
    }
  },
  computed: {
    imageUrls() {
      return this.motor.imageUrl.slice(1);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchMotor();
    this.token = localStorage.getItem("token");
  }
};
</script>

<style>
h2 {
  padding-left: 15px;
  font-weight: 700;
}

.note {
  text-align: left;
  font-size: 18px;
  line-height: 28px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#add-to-cart-button {
  background-color: #febd69;
}

#wishlist-button {
  background-color: #b9b9b9;
  border-radius: 0;
}

#show-cart-button {
  background-color: #131921;
  color: white;
  border-radius: 0;
}

img.motor {
  height: 90%;
}
</style>