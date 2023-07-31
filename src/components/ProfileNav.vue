<template>
      <div class="container-fluid nav-container">
        <div class="row">
          <div class="container">
            <ul class="nav">
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="profile" :to="{ name: 'Profile' }">Thông tin cá nhân</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="license" :to="{ name: 'IdLicense' }">Thông tin định danh và bằng lái</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="bank" :to="{ name: 'Bank' }">Thông tin ngân hàng</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="address" :to="{ name: 'Address' }">Địa chỉ</router-link>
              </li>
              <li class="nav-item pb-0">
                <router-link class="nav-link" id="password" :to="{ name: 'ChangePassword' }">Đổi mật khẩu</router-link>
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
