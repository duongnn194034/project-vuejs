<template>
  <div class="container">
    <!--    Logo Div-->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../assets/icon.png" />
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12 justify-content-center d-flex flex-row pt-5">
        <div id="signup-div" class="flex-item border">
          <h2 class="pt-4 pl-4">Sign Up</h2>
          <form @submit="signup" class="pt-4 pl-4 pr-4">
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                required
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label>Full Name</label>
                  <input
                    type="name"
                    class="form-control"
                    v-model="fullName"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                required
              />
            </div>
            <div class="form-group">
              <div class="form-row">
                <img src="../assets/red_cross.svg" v-show="!checkLength" id="icon">
                <img src="../assets/green_tick.svg" v-show="checkLength" id="icon">
                <p class="form-text text-muted" id="des">Password is at least 8 characters long.</p>
              </div>
              <div class="form-row">
                <img src="../assets/red_cross.svg" v-show="!checkNum" id="icon">
                <img src="../assets/green_tick.svg" v-show="checkNum" id="icon">
                <p class="form-text text-muted" id="des">Password contains a number and a letter.</p>
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordConfirm"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mt-2 py-0" v>
              Create an account
            </button>
          </form>
          <hr />
          <small class="form-text text-muted pt-2 pl-4 text-center"
            >Already have an account?</small
          >
          <p class="text-center">
            <router-link
              class="btn btn-dark text-center mx-auto px-5 py-1 mb-2"
              :to="{ name: 'Signin' }"
              >Sign In</router-link
            >
          </p>
          <hr />
          <p class="text-center">
            <router-link
              class="btn btn-secondary text-center mx-auto px-5 py-1 mb-2"
              :to="{ name: 'Home' }"
              >Back to Home</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: "Signup",
  props: ["baseURL"],
  data() {
    return {
      email: "",
      fullName: "",
      password: "",
      passwordConfirm: "",
      checkLength: false,
      checkChar: false,
    };
  },
  watch: {
    password(newPass) {
      if (newPass?.length >= 8 && !this.checkLength) {
        this.checkLength = true;
      } else if (newPass?.length < 8 && this.checkLength) {
        this.checkLength = false;
      }
      if (/\d/g.test(newPass) && /[A-Za-z]/g.test(newPass) &&!this.checkNum) {
        this.checkNum = true;
      } else if ((!/\d/g.test(newPass) || !/[A-Za-z]/g.test(newPass)) && this.checkNum) {
        this.checkNum = false;
      }
    }
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      // if the password matches
      if (this.checkLength && this.checkNum) {
        if (this.password === this.passwordConfirm) {
          // make the post body
          const user = {
            email: this.email,
            fullName: this.fullName,
            password: this.password,
          };

          // call the API
          await axios
            .post(`${this.baseURL}user/signUp`, user)
            .then(() => {
              // redirect to home page
              this.$router.replace("/");
              swal({
                text: "User signup successful. Please Login",
                icon: "success",
                closeOnClickOutside: false,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // passwords are not matching
          swal({
            text: "Error! Passwords are not matching",
            icon: "error",
            closeOnClickOutside: false,
          });
        }
      } else {
        swal({
            text: "Error! Password is not valid",
            icon: "error",
            closeOnClickOutside: false,
          });
      }
    },
  },
};
</script>

<style scoped>
.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8 #a2a6ac #a2a6ac;
}

.btn-primary {
  background-color: #f0c14b;
  color: black;
  border-color: #a88734 #9c7e31 #846a29;
  border-radius: 0;
}

#des {
  margin-left: 10px;
}

#icon {
  width: 20px; 
  height: 20px; 
  margin-top: 0.25rem
}

#logo {
  width: 150px;
}

@media only screen and (min-width: 992px) {
  #signup-div {
    width: 40%;
  }
}
</style>
