<template>
    <div class="container-fluid nav-container">
        <div class="row">
            <div class="container">
                <ul class="nav">
                <li class="nav-item pb-0">
                    <a class="nav-link active" href="#">Personal Details</a>
                </li>
                <li class="nav-item pb-0">
                    <a class="nav-link" href="#">License Details</a>
                </li>
                <li class="nav-item pb-0">
                    <a class="nav-link" href="#">Bank Details</a>
                </li>
                <li class="nav-item pb-0">
                    <a class="nav-link" href="#">Address</a>
                </li>
                <li class="nav-item pb-0">
                    <a class="nav-link" href="#">My Reviews</a>
                </li>
            </ul>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Profile</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <ImageBox v-if="!editMode" :image="image" class="round"/>
                <AddImage v-else class="round"/>
            </div>
            <div class="col-md-8 px-5 px-md-0">
                <form>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" v-model="fullname" :readonly="!editMode">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="url" class="form-control" v-model="email" :readonly="!editMode">
                    </div>
                    <div class="form-group">
                        <label>Mobile Number</label>
                        <input type="url" class="form-control" v-model="phoneNumber" :readonly="!editMode">
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <select class="form-control" v-model="role" :disabled="!editMode">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <button v-if="editMode" type="button" class="btn btn-primary" @click="saveChanged">Save Changed</button>
                    <button v-else type="button" class="btn btn-secondary" @click="() => {this.editMode = true}">Edit Profile</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ImageBox from '../../components/Image/ImageBox.vue'
import AddImage from '../../components/Image/AddImage.vue'
export default {
    data() {
        return {
            token: null,
            fullname: null,
            phoneNumber: null,
            email: null,
            role: null,
            imageUrl: null,
            editMode: false,
            image: {
                url: "",
                name: "avatar"
            },
        }
    },
    props: ["baseURL", "user", "motors"],
    components: { ImageBox, AddImage },
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

.nav-container {
    border-bottom: 1px solid #ddd;
    background-color: #eee;
}

.active {
    font-weight: bold;
}

.round {
    border-radius: 150px;
}
</style>