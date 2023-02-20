<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">User Profile</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
                <div class="col-md-6 px-5 px-md-0">
                    <form>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="fullname" required>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" v-model="address" required>
                        </div>
                        <div class="form-group">
                            <label>Phonenumber</label>
                            <input type="url" class="form-control" v-model="phonenumber" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="url" class="form-control" v-model="email" required>
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input type="url" class="form-control" v-model="role" required>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveChanged">Save changed</button>
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
            phonenumber: null,
            email: null,
            role: null
        }
    },
    props: ["baseURL", "user"],
    methods: {
        saveChanged() {
            swal({
                text: "Confirm?",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: "OKl"
                    },
                    cancel: true,
                    closeOnClickOutside: false,
                }
                    }).then(value => {
                        if (value == "OK") {
                            axios.patch(this.baseURL+"product/update/"+this.id)
                            .then(res => {
                                swal({
                                text: "Product has been deleted",
                                icon: "warning",
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
              this.fullname = response.data.fullname
              this.address = response.data.address
              this.phonenumber = response.data.phonenumber
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