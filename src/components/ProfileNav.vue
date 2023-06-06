<template>
      <div class="container-fluid nav-container">
        <div class="row">
          <div class="container">
            <ul class="nav">
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="profile" :to="{ name: 'Profile' }">Personal Details</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="license" :to="{ name: 'IdLicense' }">Id & License Details</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="bank" :to="{}">Bank Details</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="address" :to="{}">Address</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="review" :to="{}">My Reviews</router-link>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["active"],
  mounted() {
    document.getElementById(this.active).setAttribute("class", "nav-link active");
  }
}
</script>
<style scoped>
.nav-container {
    border-bottom: 1px solid #ddd;
    background-color: #eee;
}
.active {
    font-weight: bold;
}
</style>
