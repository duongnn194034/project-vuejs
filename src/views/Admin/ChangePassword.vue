<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="pt-3">Change Password</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
                <div class="col-md-6 px-5 px-md-0">
                    <form>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="text" class="form-control" v-model="password" required>
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input type="text" class="form-control" v-model="newPass" required>
                        </div>
                        <div class="form-group">
                            <label>Re-input New Password</label>
                            <input type="url" class="form-control" v-model="newPassRe" required>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveChanged">Submit</button>
                    </form>
                </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            token: null,
            password: null,
            newPass: null,
            newPassRe: null
        }
    },
    props : ["baseURL"],
    methods: {
        async saveChanged() {
            if (this.newPass != this.newPassRe) {
                swal({
                    text: "Wrong re-input-password",
                    icon: "error",
                    closeOnClickOutside: false,
                });
            } else {
                await axios.post(`${this.baseURL}user/changePassword?token=${this.token}&password=${this.password}&newPassword=${this.newPass}`
                ).then((res) => {
                    let status = res.data.success
                    let msg = res.data.message
                    if (status) {
                        swal({
                            text: msg,
                            icon: "success",
                            closeOnClickOutside: false,
                        })
                        this.$router.push({ name: 'Home'})
                    } else {
                        swal({
                            text: msg,
                            icon: "error",
                            closeOnClickOutside: false,
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                    swal({
                        text: "Error",
                        icon: "failed",
                        closeOnClickOutside: false,
                    })
                })
            }
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
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