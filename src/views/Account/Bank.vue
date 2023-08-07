<template>
  <ProfileNav active="bank" />
  <div class="container">
    <div class="row">
      <div class="col-12 fs-3">
        <h4 class="pt-3">Thông tin ngân hành</h4>
        <span class="pl-2 py-2">Nếu bạn là chủ xe nhập thông tin dưới đây để nhận thanh toán</span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="form-group col-md-6">
        <label>Tên ngân hàng</label>
        <input type="text" class="form-control" placeholder="Enter bank name" v-model="bankName">
      </div>

      <div class="form-group col-md-6">
        <label>Tên chủ tài khoản</label>
        <input type="text" class="form-control" placeholder="Account holder's name" v-model="holderName">
      </div>

      <div class="form-group col-md-6">
        <label>Số tài khoản</label>
        <input type="text" class="form-control" inputmode="numeric" placeholder="Account number" v-model="number">
      </div>

      <div class="form-group col-md-6">
        <label>Sort code</label>
        <div class="d-flex">
          <input type="text" maxlength="2" class="form-control col-md-3 mr-3" placeholder="xx" v-model="code1">
          <input type="text" maxlength="2" class="form-control col-md-3 mr-3" placeholder="xx" v-model="code2">
          <input type="text" maxlength="2" class="form-control col-md-3" placeholder="xx" v-model="code3">
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-primary" type="submit" @click="submitHandler">Lưu thay đổi</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ProfileNav from '../../components/ProfileNav.vue';
export default {
  data() {
    return {
      bankName: null,
      holderName: null,
      number: null,
      code1: null,
      code2: null,
      code3: null,
    }
  },
  name: 'Bank',
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  components: { ProfileNav },
  methods: {
    async submitHandler() {
      await axios.patch(`${this.baseURL}user/update/bank`, {
        bankName: this.bankName,
        holderName: this.holderName,
        accountNumber: this.number,
        sortCode: [this.code1, this.code2, this.code3]
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((res) => {
        swal({
          text: "Thông tin số thẻ đã được cập nhật.",
          icon: "success",
        });
        this.$emit("fetchData");
      })
      .catch((err) => {
        console.log(err);
        swal({
          text: err,
          icon: "error",
        })
      })
    }
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: 'Home' })
    }
    this.bankName = this.user.bank?.bankName;
    this.holderName = this.user.bank?.holderName;
    this.number = this.user.bank?.accountNumber;
    this.code1 = this.user.bank?.sortCode[0];
    this.code2 = this.user.bank?.sortCode[1];
    this.code3 = this.user.bank?.sortCode[2];
  }
}
</script>
<style scoped>
.fs-3 {
  font-size: larger;
}

.form-control {
  height: 43px;
}

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
</style>