<template>
  <div>
    <Line :data="chartData" :options="chartOptions" v-if="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'CmpVoca',
  components: { Line },
  data() {
    return {
      chartData: null,
      chartOptions: {}
    };
  },
  created() {
    this.chartOptions = this.baseOptions('어휘'); // 차트 옵션 초기화
    this.loadChartData();
  },
  methods: {
    baseOptions(title) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100,
            grid: { display: false },
            display: false
          },
          x: {
            display: false,
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: title,
            align: 'start',
            font: { size: 30, weight: 'bold', family: 'omyu_pretty' },
            padding: { top: 0, bottom: 5 }
          },
        },
        animation: { duration: 1200, easing: 'easeInOutBack' }
      };
    },
    async loadChartData() {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/monthlyScore.json');

        if (response.status === 200 && response.data) {
          const dataKey = 'monthlyvoca';
          const data = [
            response.data[dataKey + 'jan'],
            response.data[dataKey + 'feb'],
            response.data[dataKey + 'mar'],
            response.data[dataKey + 'apr']
          ];

          const lastMonthIndex = data.length - 2;
          const change = data[data.length - 1] - data[lastMonthIndex];
          const changeText = change >= 0 ? `+${change.toFixed(1)}` : change.toFixed(1);

          this.chartOptions.plugins.title.text = `어휘 ${changeText}`;
          this.chartData = {
            labels: ['1월', '2월', '3월', '4월'],
            datasets: [{
              type: 'line',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 2,
              tension: 0.1,
              fill: true
            }]
          };
        } else {
          console.error("Data not loaded properly:", response);
        }
      } catch (error) {
        console.error('Data fetch error:', error);
        alert('차트 데이터를 로드하는 데 실패했습니다.');
      }
    }

  }
};
</script>


<style scoped>
/* CSS 스타일 */
</style>
