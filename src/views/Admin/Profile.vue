<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Thông tin tài khoản</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
                <div class="col-md-6 px-5 px-md-0">
                    <form>
                        <div class="form-group">
                            <label>Họ và tên</label>
                            <input type="text" class="form-control" v-model="fullname" required>
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" class="form-control" v-model="address" required>
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="url" class="form-control" v-model="phoneNumber" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="url" class="form-control" v-model="email" required>
                        </div>
                        <div class="form-group">
                            <label>Vai trò</label>
                            <!-- <input type="url" class="form-control" v-model="role" disabled> -->
                            <select class="form-control" v-model="role">
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveChanged">Lưu thay đổi</button>
                    </form>
                </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            token: null,
            fullname: null,
            address: null,
            phoneNumber: null,
            email: null,
            role: null
        }
    },
    props: ["baseURL", "user"],
    methods: {
        saveChanged() {
            swal({
                icon: "warning",
                text: "Xác nhận",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: "OK"
                    },
                cancel: true,
                closeOnClickOutside: false,
                }
                    }).then(value => {
                        if (value == "OK") {
                            axios.patch(this.baseURL+`user/update?token=${this.token}`, {
                                fullname: this.fullname,
                                address: this.address,
                                phoneNumber: this.phoneNumber,
                                email: this.email,
                                role: this.role,
                            })
                            .then(res => {
                                swal({
                                    text: "Thông tin người dùng đã được cập nhật",
                                    icon: "success",
                            })
                    })
                .catch(err => console.log(err))
                }
            })
        }
    },
    mounted() {
        this.token = localStorage.getItem('token')
        if (this.token) {
        axios.get(`${this.baseURL}user/get?token=${this.token}`).then(
          (response) => {
            if (response.status == 200) {
                console.log(response.data)
              this.fullname = response.data.fullname
              this.address = response.data.address
              this.phoneNumber = response.data.phoneNumber
              this.email = response.data.email
              this.role = response.data.role
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
}
</script>
<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>