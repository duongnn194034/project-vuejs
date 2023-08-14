<template>
  <div class="chart-container">
    <LineChartSample />
  </div>
  <div class="container mt-4">
    <h6 class="text-center">Thống kê số xe thuê trong 7 ngày vừa qua.</h6>
  </div>
  <hr>
  <div class="container mt-x">
    <h4 class="text-center">Thống kê thu nhập theo người</h4>
  </div>
  <div class="container">
    <div class="row mt-5" v-if="loading">
      <div class="col-12">
        <Loader/>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12 my-3 d-flex justify-content-center">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">SĐT</th>
              <th scope="col">Số yêu cầu</th>
              <th scope="col">Thu nhập (VND)</th>
              <th scope="col">Ngân hàng</th>
              <th scope="col">STK</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stat, index) in stats">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ stat.fullName }}</td>
              <td>{{ stat.email }}</td>
              <td>{{ stat.phoneNumber }}</td>
              <td>{{ stat.offerNum }}</td>
              <td>{{ stat.income * 0.9 }}</td>
              <td>{{ stat.bank }}</td>
              <td>{{ stat.bankNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LineChartSample from '../../components/Chart/LineChartSample'
import LineChart from '../../components/Chart/LineChart.vue'
import Loader from '../../components/Atomic/Loader.vue'
export default {
  data() {
    return {
      stats: [],
      loading: true,
    }
  },
  props: ["baseURL", "motors", "user"],
  emits: ["fetchData"],
  name: 'App',
  components: { LineChartSample, LineChart, Loader },
  methods: {
    async fetchStats() {
      await axios.get(`${this.baseURL}offer/listPrice`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.stats = res.data;
        this.loading = false;
        console.log(this.stats);
      })
      .catch(err => console.log(err));
    }
  },
  mounted() {
    this.fetchStats();
  }
}
</script>
<style scoped>
.chart-container {
  min-height: 500px;
}

.mt-x {
  margin-top: 5rem;
}
</style>