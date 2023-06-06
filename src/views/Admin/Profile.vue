<template>
    <ProfileNav active="profile" />
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Profile</h4>
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
                        <label>Full Name</label>
                        <input type="text" class="form-control" v-model="fullname" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Email</label>
                        <input type="url" class="form-control" v-model="email" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Mobile Number</label>
                        <input type="url" class="form-control" v-model="phoneNumber" :readonly="!editMode">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Role</label>
                        <select class="form-control" v-model="role" :disabled="!editMode">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div class="form-group col-12">
                        <label>Biography</label>
                        <textarea class="form-control" rows="4" v-model="biography" :readonly="!editMode"></textarea>
                    </div>
                    <button v-if="editMode" type="button" class="btn btn-primary" @click="saveChanged">Save Changed</button>
                    <button v-else type="button" class="btn btn-secondary" @click="() => {this.editMode = true}">Edit Profile</button>
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
        }
    },
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
                closeOnClickOutside: false,
                }
            }).then(value => {
                if (value == "OK") {
                    axios.patch(`${this.baseURL}user/update`, {
                        fullname: this.fullname,
                        phoneNumber: this.phoneNumber,
                        email: this.email,
                        role: this.role,
                        avatarUrl: this.image.url
                    }, {
                        headers: {
                            token: this.token
                        }
                    })
                    .then(() => {
                        swal({
                            text: "Thông tin người dùng đã được cập nhật",
                            icon: "success",
                        })
                    })
                    .catch(err => console.log(err))
                }
            });
            this.editMode = false;
        }
    },
    mounted() {
        this.token = localStorage.getItem('token')
        if (this.token) {
        axios.get(`${this.baseURL}user/get`, {
            headers: {
                token: this.token
            }
        }).then(
          (response) => {
            if (response.status == 200) {
              this.fullname = response.data.fullName
              this.phoneNumber = response.data.phoneNumber
              this.email = response.data.email
              this.role = response.data.role
              this.image.url = response.data.avatarUrl;
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

.round {
    border-radius: 150px;
}
</style>