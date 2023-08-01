<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 col-md-offset-1 no-padding-sm">
        <div class="card w-100 no-bg owner">
          <section class="bg-success bg-gradient profile">
            <div class="row m-0 image-row">
              <ImageCircle :image="{ url: this.user?.avatarUrl, name: 'avatar'}" :option2="true"/>
            </div>
            <div class="row m-0 name">
              <p class="text-left" itemprop="name">
                <a>{{ user?.fullName }}</a>
              </p>
              <div class="badges hidden-xs">
                <span class="color-white">ID not verified</span>
              </div>
            </div>
            <div class="row ml-0 mr-0 mt-3 details">
              <div class="col-lg-5 col-sm-5 col-xs-12">
                <p class="text-left no-margin">
                 {{ createdAt }}
                </p>
              </div>
              <div class="col-lg-4 col-sm-4 col-xs-12 border-white">
                <p class="no-margin">Phone: {{ user?.phoneNumber }}</p>
              </div>
              <div class="col-lg-3 col-sm-3 col-xs-12 border-white">
                <div class="row">
                  <a :href="user?.facebookUrl" target="_blank">
                    <img src="../../assets/facebook.png" alt="fb" class="contact" v-if="user?.facebookUrl">
                  </a>
                  <a :href="user?.zaloUrl" target="_blank">
                    <img src="../../assets/zalo.png" alt="zalo" class="contact" v-if="user?.zaloUrl">
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-white biography">
            <div class="row bio-row">
              <div class="col-12 bio">
                <div class="expanding color-dark-grey text-left padding-bottom-10" itemprop="description">
                  <p>{{ this.user?.biography }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="card w-100 reviews-card">
          <section class="bg-white reviews">
            <div class="row reviews m-0 pt-4">
              <div class="col-12">
                <h5>{{ reviews }}</h5>
              </div>
            </div>
            <div class="row m-0 pt-4">
              <Rate v-for="(rate, index) in ratings" :key="index" :index="index" :review="rate" />
            </div>
          </section>
        </div>
      </div>
      <div class="col-md-5 col-md-offset-1 no-padding-sm">
        <div class="card w-100 vehicle">
          <div class="row m-0 pt-4">
            <div class="col-12 mb-4 h4">{{ title }}</div>
            <div class="col-12 mb-4" v-for="(motor, index) in motors" :key="index">
              <MotorBox :motor="motor"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import ImageCircle from '../../components/Image/ImageCircle.vue';
  import Rate from '../../components/Rate/Rate.vue';
  import MotorBox from '../../components/Vehicle/MotorBox.vue';
  export default {
    data() {
      return {
        user: null,
        ratings: [],
        motors: [],
      }
    },
    props: ["baseURL"],
    components: { ImageCircle, Rate, MotorBox },
    methods: {
      async getUser(id) {
        await axios.get(`${this.baseURL}user/get/${id}`)
          .then(res => {
            this.user = res.data;
          })
          .catch(err => console.log(err));
      },

      async getRatings(id) {
        await axios.get(`${this.baseURL}user/get/${id}/rating`)
          .then(res => {
            this.ratings = res.data;
          })
          .catch(err => console.log(err));
      },
      
      async getMotors(limit) {
        await axios.get(`${this.baseURL}motor/list?limit=${limit}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(res => {
            this.motors = res.data;
          })
          .catch(err => console.log(err));
      },
    },
    computed: {
      createdAt() {
        const createdDate = new Date(this.user?.createdAt).toLocaleDateString();
        return `Member since ${createdDate}`; 
      },

      reviews() {
        const rev = this.ratings?.length
        if (rev > 1) {
          return `This user's vehicles have received ${rev} reivews.`
        } else {
          return `This user's vehicles have received ${rev} reivew.`
        }
      },

      title() {
        return `${this.user?.fullName}'s vehicles`;
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.getUser(id);
      this.getRatings(id);
      this.getMotors(5);
    }
  }
</script>
<style scoped>
.image-box{
  width: 150px !important;
  height: 150px !important;
  border-radius: 75px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  float: left;
  margin-right: 20px;
  margin-top: -90px;
  position: absolute;
  width: 154px;
  z-index: 1;
}

.owner {
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
  line-height: 30px;
  margin: 130px 0 30px;
}

.reviews-card {
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
  line-height: 30px;
}

section.profile {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

section.biography {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

section.reviews {
  border-radius: 5px;
}

.m-0 > p.text-left {
  display: inline-block;
  font-size: 25px;
  font-weight: 700;
  margin: 85px 20px 5px;
  color: white;
}

.m-0 > .badges {
  display: inline-block;
  font-size: 18px;
  margin: 85px 20px 5px;
  color: white;
}

.border-white {
  border-left: 1px solid white;
}

.details > div, .details > p {
  display: inline-block;
  font-size: 18px;
  color: white;
}

.bio-row {
  margin: 20px 0 0;
}

.vehicle {
  background-color: #fff;
  margin-top: 130px;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2); 
}

.vehicle .card {
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);  
}

img.contact {
  height: 40px;
  width: 40px;
  margin-left: 1rem;
}
</style>