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
              >Trang chủ</router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'ListMotors' }"
              >Thuê xe</router-link>         
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'LoanMotor' }"
              >Cho thuê xe</router-link>         
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            v-if="token && user?.role === 'ADMIN'"
          >
            Admin
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              v-if="token"
              :to="{ name: 'Dashboard'}"
            >Dashboard</router-link>
            <router-link 
              class="dropdown-item" 
              v-if="token" 
              :to="{ name: 'ManageAccounts' }"
            >Quản lý tài khoản</router-link>
          </div>
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
            {{ this.user?.fullName }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              v-if="token"
              :to="{ name: 'Profile'}"
            >Thông tin tài khoản</router-link>
            <router-link 
              class="dropdown-item" 
              v-if="token" 
              :to="{ name: 'MyMotors' }"
            >Xe của tôi</router-link>
            <router-link 
              class="dropdown-item" 
              v-if="token" 
              :to="{ name: 'MyOffers' }"
            >Xe đã thuê</router-link>          
            <a class="dropdown-item" v-if="token" href="#" @click="signout"
              >Đăng xuất</a
            >
          </div>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-light"
            v-if="!token"
            :to="{ name: 'Signup' }"
            >Đăng kí</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link bg-primary text-light rounded"
            v-if="!token"
            :to="{ name: 'Signin' }"
            >Đăng nhập</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["user"],
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
        text: "You has signed out.",
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

#cart {
  position: relative;
}

.dropdown-menu {
  left: -2rem;
}
</style>
