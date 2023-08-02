<template>
    <ProfileNav active="profile" />
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Thông tin tài khoản</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <ImageCircle v-if="!editMode" :image="image" class="round"/>
                <AddImage v-else :baseURL="baseURL" @addImage="(url) => this.image.url = url" class="round" rounded="true"/>
            </div>
            <div class="col-md-8 px-5 px-md-0">
                <form class="row">
                    <div class="form-group col-md-6">
                        <label>Họ và tên</label>
                        <input type="text" class="form-control" v-model="fullname" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Email</label>
                        <input type="url" class="form-control" v-model="email" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Số điện thoại</label>
                        <input type="url" class="form-control" v-model="phoneNumber" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Vai trò</label>
                        <select class="form-control" v-model="role" disabled>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Zalo Url</label>
                        <input type="url" class="form-control" v-model="zalo" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Facebook Url</label>
                        <input type="url" class="form-control" v-model="fb" :readonly="!editMode">
                    </div>
                    <div class="form-group col-12">
                        <label>Giới thiệu</label>
                        <textarea class="form-control" rows="4" v-model="biography" :readonly="!editMode"></textarea>
                    </div>
                    <button v-if="editMode" type="button" class="btn btn-primary" @click="saveChanged">Lưu thay đổi</button>
                    <button v-else type="button" class="btn btn-secondary" @click="() => {this.editMode = true}">Chỉnh sửa thông tin</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ImageCircle from '../../components/Image/ImageCircle.vue';
import AddImage from '../../components/Image/AddImage.vue'
import ProfileNav from '../../components/ProfileNav.vue';
export default {
    data() {
        return {
            token: null,
            fullname: null,
            phoneNumber: null,
            email: null,
            role: null,
            editMode: false,
            image: {
                url: "",
                name: "avatar"
            },
            biography: null,
            fb: null,
            zalo: null
        }
    },
    name: 'Profile',
    props: ["baseURL", "user", "motors"],
    emits: ["fetchData"],
    components: { ImageCircle, AddImage, ProfileNav },
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
                },
            }).then(value => {
                if (value == "OK") {
                    axios.patch(`${this.baseURL}user/update`, {
                        fullname: this.fullname,
                        phoneNumber: this.phoneNumber,
                        email: this.email,
                        biography: this.biography,
                        avatarUrl: this.image.url,
                        zaloUrl: this.zalo,
                        fbUrl: this.fb
                    }, {
                        headers: {
                            token: this.token
                        }
                    })
                    .then(() => {
                        swal({
                            text: "Thông tin đã cập nhật.",
                            icon: "success",
                        });
                        this.editMode = false;
                    })
                    .catch(err => {
                        console.log(err);
                        swal({
                            text: err.message,
                            icon: "error",
                        });
                        this.editMode = false;
                    })    
                }
            });
        }
    },
    mounted() {
        this.token = localStorage.getItem('token')
        if (this.token) {     
            this.fullname = this.user.fullName;
            this.phoneNumber = this.user.phoneNumber;
            this.email = this.user.email;
            this.role = this.user.role;
            this.image.url = this.user.avatarUrl;
            this.biography = this.user.biography;
            this.fb = this.user.facebookUrl;
            this.zalo = this.user.zaloUrl;
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

.round {
    border-radius: 150px;
}
</style>