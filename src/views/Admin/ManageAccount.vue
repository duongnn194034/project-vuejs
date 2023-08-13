<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-4">
        <h2>Quản lý tài khoản</h2>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="d-flex justify-content-between">
          <ul class="nav">
            <li class="nav-item pb-0">
              <router-link :to="{ name: 'ManageAccounts', query: { filter: 'toVerify' }}" class="nav-link" id="toVerify" 
                @click="linkHandler">Đang chờ xác thực <span id="num" v-if="num">{{ num }}</span></router-link>
            </li>
            <li class="nav-item pb-0">
              <router-link :to="{ name: 'ManageAccounts', query: { filter: 'all' }}" class="nav-link" id="all"
                @click="linkHandler">Tất cả</router-link>
            </li>
          </ul>
          <form class="col-6" action=""  @submit="searchUser">
            <input class="form-control" v-model="search" placeholder="Tìm kiếm theo email">
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5" v-if="loading">
      <div class="col-12">
        <Loader/>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12 my-3 d-flex justify-content-center" v-for="user in displayUsers">
        <div class="card w-75">
          <div class="image-container">
            <img
              class="card-img-top"
              :src="user.avatarUrl ? user.avatarUrl : 
              'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'"
              alt="Motor Image"
            />
          </div>
          <div class="card-body">
            <div class="details-container clearfix">
              <div class="d-flex align-items-center justify-content-between">
                <a
                  ><h5 class="card-title">{{ user.fullName }}</h5></a>
              </div>
              <div class="info-container">
                <span>{{ user.role }}</span><br>
                <span>{{ user.email }}</span><br>
                <span v-if="user.verified">Đã định danh</span>
                <span v-else>Chưa định danh</span><br>
                <span>Tham gia từ {{ new Date(user.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>
            <div class="button-group">
              <button 
                class="btn btn-primary" 
                type="button" 
                @click="() => this.$router.push({ name: 'AccountDetails', params: { id: user.id }})"
                v-show="this.active == 'toVerify'"
              >Thông tin xác thực</button>
              <button 
                class="btn btn-info" 
                type="button"
                @click="promoteHandler(user.id)"
                v-show="this.active == 'all' && user.role == 'USER'"
              >Đặt làm ADMIN</button>
              <button 
                class="btn btn-secondary" 
                type="button" 
                @click="demoteHandler(user.id)"
                v-show="this.active == 'all' && user.role == 'ADMIN'"
              >Đặt làm USER</button>
              <button 
                class="btn btn-danger" 
                type="button"
                @click="deleteHandler(user.id)"
                v-show="this.active == 'all'"
              >Xóa tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import Loader from '../../components/Atomic/Loader.vue';
import swal from 'sweetalert';
  export default {
    data() {
      return {
        users: [],
        displayUsers: [],
        queryUsers: [],
        toDisplayUsers: [],
        active: 'all',
        loading: false,
        num: 0,
        search: null,
      }
    },
    props: ["baseURL", "user", "motors"],
    emits: ["fetchData"],
    components: { Loader },
    methods: {
      async fetchUsers(query) {
        let url = `${this.baseURL}user/all`;
        if (query) {
          url = url + `?query=${query}`;
        }
        await axios
          .get(url, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then((res) => {
            this.users = res.data;
            this.filter();
            this.num = this.users.filter(user => !user.verified && user.idCard)?.length;
          })
          .catch((err) => console.log(err));
      },

      filter() {
        switch(this.active) {
          case 'all': 
            this.displayUsers = this.users;
            this.queryUsers = this.displayUsers;
            break;
          case 'toVerify':
            this.displayUsers = this.users.filter(user => !user.verified && user.idCard);
            this.queryUsers = this.displayUsers;
            break;
        }
      },

      searchUser(e) {
        e.preventDefault();
        this.displayUsers = this.queryUsers.filter(user => new RegExp(this.search).test(user.email));
      },

      linkHandler(e) {
        e.preventDefault();
        this.active = e.target.id;
        document.getElementsByClassName("active")[0].setAttribute("class", "nav-link");
        e.target.setAttribute("class", "nav-link active");
      },

      promoteHandler(id) {
        swal({
          icon: 'warning',
          text: 'Đặt người này làm quản trị viên?',
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
            axios.patch(`${this.baseURL}user/admin/promote?user=${id}`, {}, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then((res) => {
              if (res.status == 200) {
                this.fetchUsers();
                swal({
                  icon: 'success',
                  text: 'Người dùng đã trờ thành quản trị viên',
                  closeOnClickOutside: true
                });
              }
            })
            .catch((err) => console.log(err));
          }
        })
      },

      demoteHandler(id) {
        swal({
          icon: 'warning',
          text: 'Đặt người này làm người dùng?',
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
            axios.patch(`${this.baseURL}user/admin/demote?user=${id}`, {}, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then((res) => {
              if (res.status == 200) {
                this.fetchUsers();
                swal({
                  icon: 'success',
                  text: 'Người dùng đã không còn là QTV.',
                  closeOnClickOutside: true
                });
              }
            })
            .catch((err) => console.log(err));
          }
        })
      },

      deleteHandler(id) {
        swal({
          icon: 'warning',
          text: 'Xóa người dùng này? Chú ý việc xóa không thể hoàn tác.',
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
            axios.patch(`${this.baseURL}user/admin/delete?user=${id}`, {}, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then((res) => {
              if (res.status == 200) {
                this.fetchUsers();
                swal({
                  icon: 'success',
                  text: 'Đã xóa người dùng.',
                  closeOnClickOutside: true
                });
              }
            })
            .catch((err) => console.log(err));
          }
        })
      },
    },
    watch: {
      active() {
        this.filter();
      }
    },
    mounted() {
      if (this.$route.query.filter) {
        this.active = this.$route.query.filter;
      }
      document.getElementById(this.active).setAttribute("class", "nav-link active");
      this.fetchUsers();
    }
  }
</script>
<style scoped>
  h3.text-center {
    font-weight: 700;
  }

  .active {
      font-weight: bold;
      cursor: pointer;
  }

  .card {
    background-color: white;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
    flex-direction: row;
    padding: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .card-img-top {
    aspect-ratio: 1 / 1;
    height: 120px;
  }

  .info-container, .card-title {
    margin-left: 2rem;
  }

  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .badge {
    font-size: medium;
  }

  .button-group {
    display: flex;
    justify-content: right;
  }

  .btn {
    margin-left: 1rem;
  }

  #num {
    display: inline-block;
    margin-left: 3px;
    font-weight: bold;
    color: #fff;
    background-color: #eb074f;
    font-size: 14px;
    border-radius: 12px;
    padding: 5px;
    width: 24px;
    line-height: 1;
    text-align: center;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
</style>