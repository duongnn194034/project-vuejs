<template>
  <div class="container">
    <h4 class="mt-4 text-center">Định danh</h4>
    <div class="row">
      <div class="col-md-3 col-sm-12"></div>
      <div class="col-md-6 col-sm-12">
        <dl class="row mt-2">
          <dt class="col-sm-3">Họ và tên: </dt>
          <dd class="col-sm-9">{{ user.fullName }}</dd>

          <dt class="col-sm-3">Email: </dt>
          <dd class="col-sm-9">{{ user.email }}</dd>

          <dt class="col-sm-3">Số điện thoại: </dt>
          <dd class="col-sm-9">{{ user.phoneNumber }}</dd>

          <dt class="col-sm-3">Vai trò: </dt>
          <dd class="col-sm-9">{{ user.role }}</dd>
        </dl>
      </div>
      <div class="col-md-3 col-sm-12"></div>
      <div class="col-12">
        <div class="row">
          <div class="col-12 pt-3">
            <dt>Mặt trước thẻ</dt>
            <dd>
              <img 
                :src="user.idCard?.front ? user.idCard?.front : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'" 
                alt="front"
              >
            </dd>
          </div>
          <div class="col-12 pt-3">
            <dt>Mặt sau thẻ</dt>
            <dd>
              <img 
                :src="user.idCard?.back ? user.idCard?.back : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'" 
                alt="back"
              >
            </dd>
          </div>
          <div class="col-12 pt-3">
            <dt>Ảnh chụp cận mặt</dt>
            <dd>
              <img 
                :src="user.idCard?.selfie ? user.idCard?.selfie : 'https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg'" 
                alt="selfie"
              >
            </dd>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div class="container">
    <div class="row">
      <h4 class="ml-auto mr-auto">Thông tin CMT/CCCD</h4>
      <div class="form-group col-12">
        <label>Tên</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group col-12">
        <label>Số</label>
        <input type="text" class="form-control" v-model="number">
      </div>
      <div class="form-group col-12">
        <label>Ngày cấp</label>
        <input type="date" class="form-control" v-model="IO">
      </div>
      <div class="form-group col-12">
        <label>Nơi cấp</label>
        <input type="text" class="form-control" v-model="IW">
      </div>
      <div class="col-12 d-flex justify-content-center mt-4">
        <button class="btn btn-primary" @click="confirm">Xác nhận</button>
        <button class="btn btn-danger ml-2">Từ chối</button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        id: null,
        user: {},
        name: null,
        number: null,
        IO: null,
        IW: null
      }
    },
    props: ["baseURL", "motors"],
    emits: ["fetchData"],
    methods: {
      async fetchUser() {
        await axios.get(`${this.baseURL}user/get/${this.id}`)
          .then(res => {
            this.user = res.data;
          })
          .catch(err => console.log(err));
      },

      confirm() {
        swal({
          text: 'Xác thực cho người dùng này',
          icon: 'warning',
          buttons: {
            confirm: {
              text: "OK",
              value: "OK",
              closeModal: true
            },
            cancel: {
              text: "Hủy",
              value: "cancel",
              visible: true,
              closeModal: true
            }
          }
        }).then((result) => {
          if (result == "OK") {
            axios.patch(`${this.baseURL}user/admin/verify?user=${this.id}`, {
              name: this.name,
              number: this.number,
              issuedOn: this.IO,
              issuedWhere: this.IW
            }, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then((res) => {
              if (res.status == 200) {
                swal({
                  icon: 'success',
                  text: 'Định danh thành công'
                });
                this.$router.push({ name: 'ManageAccounts' });
              }
            })
            .catch((err) => console.log(err));
          }
        })
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      this.fetchUser();
    }
  }
</script>