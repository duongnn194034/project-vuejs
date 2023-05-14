<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!--    Logo-->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" src="../assets/icon.png" />
    </router-link>

    <!--    Burger Button-->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'Home' }"
              >Home</router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{}"
              >Hire a vehicle</router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'LoanMotor' }"
              >Loan vehicles</router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" v-if="token" :to="{}"
              >Your vehicles</router-link>         
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-if="token"
          >
            Account
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              v-if="token"
              :to="{ name: 'Profile'}"
            >Profile</router-link>
            <router-link
              class="dropdown-item"
              v-if="token"
              :to="{ name: 'ChangePassword'}"
            >Change Password</router-link>
            <a class="dropdown-item" v-if="token" href="#" @click="signout"
              >Sign Out</a
            >
          </div>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-light"
            v-if="!token"
            :to="{ name: 'Signup' }"
            >Sign Up</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link bg-primary text-light rounded"
            v-if="!token"
            :to="{ name: 'Signin' }"
            >Sign In</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  // props: [],
  data() {
    return {
      token: null,
      query: null
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.token = null;
      this.$router.push({ name: "Home" });
      swal({
        text: "Bạn đã đăng xuất",
        icon: "success",
        closeOnClickOutside: false,
      });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-link {
  color: rgba(255, 255, 255);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.nav-item {
  padding-bottom: 0 !important;
  margin-left: 1rem;
}

#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  font-size: 15px;
  margin-left: 10px;
}
#cart {
  position: relative;
}

.dropdown-menu {
  left: -3.5rem;
}
</style>
