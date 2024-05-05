<template>
  <div class="chart-wrap">
    <div class="chart-header">
      <h2>문법 <span :class="arrowClass">{{ changeIcon }}</span> {{ changeValue }}</h2>
    </div>
    <Line :data="chartData" :options="chartOptions" v-if="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'CmpGrammar',
  components: { Line },
  data() {
    return {
      chartData: null,
      chartOptions: this.baseOptions('문법'),
      changeIcon: '',
      changeValue: 0
    };
  },
  created() {
    this.chartOptions = this.baseOptions('문법');
    this.loadChartData();
  },
  computed: {
    arrowClass() {
      return this.changeValue >= 0 ? 'arrow-up' : 'arrow-down';
    }
  },
  methods: {
    baseOptions(title) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 5,
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
            display: false,
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
          const dataKey = 'monthlygram';
          const data = [
            response.data[dataKey + 'jan'],
            response.data[dataKey + 'feb'],
            response.data[dataKey + 'mar'],
            response.data[dataKey + 'apr']
          ];
          const lastMonthIndex = data.length - 2;
          const change = data[data.length - 1] - data[lastMonthIndex];
          this.changeValue = change.toFixed(1);
          this.changeIcon = change >= 0 ? '↑' : '↓';
          this.chartData = {
            labels: ['1월', '2월', '3월', '4월'],
            datasets: [{
              type: 'line',
              data: data,
              backgroundColor: (ctx) => {
                const canvas = ctx.chart.ctx;
                const gradient = canvas.createLinearGradient(0,0,0,160);
                gradient.addColorStop(0, 'rgb(255, 99, 132)');
                gradient.addColorStop(0.5, 'white');
                gradient.addColorStop(1, 'white');
                return gradient;
              },
              borderColor: 'rgb(255, 99, 132)',
              strokeColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              tension: 0.4,
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
.chart-wrap {
  height: 100px;
}
.chart-header h2 {
  display: flex;
  align-items: center;
  font-size: 1.5em;
}
.arrow-up {
  color: blue;
}
.arrow-down {
  color: red;
}
</style>
