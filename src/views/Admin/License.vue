<template>
  <ProfileNav active="license" />
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3">Id Details</h4>
        <i class="pl-2 py-2"><b>Notes:</b> Your Id Details is not public to others. See our <a>policy</a></i>
      </div>
    </div>
    <div class="row">
      <div v-if="!this.user?.verified" class="col-12 text-center align-items-center h5 mt-3">
        <span>You seem to have not verified yet.</span>
        <router-link class="ml-1" :to="{}">Verify Now</router-link>
      </div>
    </div>
    <dl class="row mt-2">
      <dt class="col-sm-3">Name</dt>
      <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

      <dt class="col-sm-3">ID Number</dt>
      <dd class="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>

      <dt class="col-sm-3">Date</dt>
      <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

      <dt class="col-sm-3 text-truncate">Address</dt>
      <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

      <div class="col-sm-6">
        <dt>Id Front</dt>
        <dd><img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="front"></dd>
      </div>
      <div class="col-sm-6">
        <dt>Id Back</dt>
        <dd><img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="back"></dd>
      </div>
    </dl>
  </div>
  <hr/>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3">License Details</h4>
        <span>Here are the licence details we have on record for you.</span>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileNav from '../../components/ProfileNav.vue';
export default {
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  components: { ProfileNav }
}
</script>
<style scoped>
dd > img {
  max-width: 60%;
}

h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.nav-container {
    border-bottom: 1px solid #ddd;
    background-color: #eee;
}

.active {
    font-weight: bold;
}
</style>