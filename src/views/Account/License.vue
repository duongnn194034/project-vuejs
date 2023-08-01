<template>
  <ProfileNav active="license" />
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3">Thông tin CMT/CCCD</h4>
        <i class="pl-2 py-2"><b>Chú ý: </b> Thông tin CMT/CCCD của bạn không được chia sẻ với người dùng khác. Xem <a>chính sách</a> của chúng tôi.</i>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div v-if="!this.user?.verified" class="col-12 text-center align-items-center h5 mt-3">
        <span>Bạn chưa được định danh.</span>
        <router-link class="ml-1" :to="{}">Định danh ngay</router-link>
      </div>
    </div>
    <dl class="row mt-2">
      <dt class="col-sm-3">Tên</dt>
      <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

      <dt class="col-sm-3">Mã</dt>
      <dd class="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>

      <dt class="col-sm-3">Ngày cấp</dt>
      <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

      <dt class="col-sm-3 text-truncate">Nơi cấp</dt>
      <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

      <div class="col-sm-4 pt-3">
        <dt>Mặt trước thẻ</dt>
        <dd><img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="front"></dd>
      </div>
      <div class="col-sm-4 pt-3">
        <dt>Mặt sau thẻ</dt>
        <dd><img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="back"></dd>
      </div>
      <div class="col-sm-4 pt-3">
        <dt>Ảnh chụp cận mặt</dt>
        <dd><img src="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg" alt="selfie"></dd>
      </div>
    </dl>
  </div>
  <hr/>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3">Thông tin bằng lái</h4>
        <span>Đây là thông tin bằng lái của bạn mà chúng tôi đã ghi lại được</span>
      </div>
      <dl class="row mt-2">
        <dt class="col-sm-3">Loại</dt>
        <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

        <dt class="col-sm-3">Mã</dt>
        <dd class="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>

        <dt class="col-sm-3">Ngày cấp</dt>
        <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

        <dt class="col-sm-3 text-truncate">Ngày hết hạn</dt>
        <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

        <div class="col-sm-4 pt-3">
          <dt>Mặt trước</dt>
          <dd><img src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png" alt="front"></dd>
        </div>
        <div class="col-sm-4 pt-3">
          <dt>Ảnh chụp cận mặt</dt>
          <dd><img src="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg" alt="selfie"></dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script>
import ProfileNav from '../../components/ProfileNav.vue';
export default {
  name: 'License',
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  components: { ProfileNav },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style scoped>
dd > img {
  max-width: 60%;
}

dl > dt {
  text-align: right;
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