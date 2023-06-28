<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-1 no-padding-sm">
        <div class="card w-100 no-bg owner">
          <section class="bg-primary profile">
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
              <div class="col-lg-5 col-sm-4 col-xs-12">
                <p class="text-left no-margin">
                 {{ createdAt }}
                </p>
              </div>
              <div class="col-lg-7 col-sm-8 col-xs-12 border-white">
                <span>Placeholder</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
import ImageCircle from '../../components/Image/ImageCircle.vue';
  export default {
    data() {
      return {
        user: null
      }
    },
    props: ["baseURL"],
    components: { ImageCircle },
    methods: {
      async getUser(id) {
        await axios.get(`${this.baseURL}user/get/${id}`)
          .then(res => {
            this.user = res.data;
          })
          .catch(err => console.log(err));
      }
    },
    computed: {
      createdAt() {
        const createdDate = new Date(this.user?.createdAt).toLocaleDateString();
        return `Member since ${createdDate}`; 
      },
    },
    mounted() {
      const id = this.$route.params.id;
      this.getUser(id);
    }
  }
</script>