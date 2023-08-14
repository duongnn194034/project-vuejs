<template>
  <Line :data="data" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'LineChart',
  components: {
    Line
  },
  data() {
    return {
      data: {
        labels: ['07/08', '08/08', '09/08', '10/08', '11/08', '12/08', '13/08'],
        datasets: [
          {
            label: 'Số xe thuê trong 7 ngày vừa qua',
            backgroundColor: '#f87979',
            data: [1, 0, 2, 2, 3, 2, 4]
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
