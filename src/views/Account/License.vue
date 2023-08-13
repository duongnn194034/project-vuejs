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
        <a class="ml-1" data-toggle="modal" data-target="#exampleModal">Định danh ngay</a>
      </div>
    </div>
    <dl class="row mt-2">
      <dt class="col-sm-3">Tên</dt>
      <dd class="col-sm-9">{{ this.user.idCard?.name }}</dd>

      <dt class="col-sm-3">Số</dt>
      <dd class="col-sm-9">{{ this.user.idCard?.number }}</dd>

      <dt class="col-sm-3">Ngày cấp</dt>
      <dd class="col-sm-9">{{ this.user.idCard?.issuedOn }}</dd>

      <dt class="col-sm-3 text-truncate">Nơi cấp</dt>
      <dd class="col-sm-9">{{ this.user.idCard?.issuedWhere }}</dd>

      <span class="col-12 mt-5" v-if="user.idCard?.front && user.idCard?.back && user.idCard?.selfie">
        Đăng tải thành công. Quản trị viên sẽ xác nhận thông tin và thông báo cho bạn qua email trong tối đa 7 ngày tới.
      </span>

      <div class="col-sm-4 pt-3">
        <dt>Mặt trước thẻ</dt>
        <dd>
          <img 
            :src="this.user.idCard?.front ? this.user.idCard?.front : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'" 
            alt="front"
          >
        </dd>
      </div>
      <div class="col-sm-4 pt-3">
        <dt>Mặt sau thẻ</dt>
        <dd>
          <img 
            :src="this.user.idCard?.back ? this.user.idCard?.back : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'" 
            alt="back"
          >
        </dd>
      </div>
      <div class="col-sm-4 pt-3">
        <dt>Ảnh chụp cận mặt</dt>
        <dd>
          <img 
            :src="this.user.idCard?.selfie ? this.user.idCard?.selfie : 'https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg'" 
            alt="selfie"
          >
        </dd>
      </div>
    </dl>
  </div>
  <!-- <hr/>
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
  </div> -->

   <!-- Modal-->
   <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalLabel">Thông tin CMT/CCCD</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="front">Mặt trước thẻ</label>
                <AddImage
                  :baseURL="baseURL"
                  @addImage="(url) => this.front = url"
                />
              </div>
              <div class="form-group">
                <label for="back">Mặt sau thẻ</label>
                <AddImage
                  :baseURL="baseURL"
                  @addImage="(url) => this.back = url"
                />
              </div>
              <div class="form-group">
                <label for="selfie">Ảnh chụp cận mặt</label>
                <AddImage
                  :baseURL="baseURL"
                  @addImage="(url) => this.selfie = url"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" @click="confirm">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import ProfileNav from '../../components/ProfileNav.vue';
import AddImage from '../../components/Image/AddImage.vue';
export default {
  data() {
    return {
      front: null,
      back: null,
      selfie: null,
    }
  },
  name: 'License',
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  components: { ProfileNav, AddImage },
  methods: {
    confirm(e) {
      e.preventDefault();
      if (!this.front || !this.back || !this.selfie) {
        swal({
          icon: "warning",
          text: "Đăng tải đủ 3 ảnh.",
        });
        return;
      }
      swal({
        icon: "warning",
        text: "Bạn đã chắc chắn thông tin của mình là chính xác.",
        buttons: {
          confirm: {
            text: "OK",
            value: "OK"
          },
          cancel: true,
        },
      }).then(value => {
        if (value == "OK") {
          axios.put(`${this.baseURL}user/update/card`, {
            front: this.front,
            back: this.back,
            selfie: this.selfie
          }, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(() => {
            swal({
              text: "Đăng tải thành công. Quản trị viên sẽ xác nhận thông tin và thông báo cho bạn qua email trong tối đa 7 ngày tới.",
              icon: "success",
            });
            this.front = null;
            this.back = null;
            this.selfie = null;
            this.$emit("fetchData");
          })
          .catch(err => {
            console.log(err);
            swal({
              text: err.message,
              icon: "error",
            });
          })    
        }
      });
    },

  },
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

  a {
    cursor: pointer;
  }
</style>