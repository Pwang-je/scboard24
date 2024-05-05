<template>
  <div>
    <Line :data="monthlyGramChartData" :options="monthlyChartOptions" v-if="monthlyGramChartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'cmpMonthly',
  components: {
    Line, // Bar에서 Line으로 변경
  },

  data() {
    const baseChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      scales: {
        y: {
          suggestedMax: 25, // y축의 최대 값 조정
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'omyu_pretty',
              size: 14,
            },
          },
        },
        title: {
          display: true,
          align: 'start',
          text: '문법', // 차트 제목
          font: {
            size: 30,
            weight: 'bold',
            family: 'omyu_pretty',
          },
          padding: {
            top: 0,
            bottom: 5,
          },
        },
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutBack',
      },
    };

    return {
      monthlyGramChartData: null,
      monthlyChartOptions: baseChartOptions,
    };
  },

  created() {
    this.updateMonthlyGramChartData();
  },

  methods: {
    async updateMonthlyGramChartData() {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/monthlyScore.json'
        );
        const { monthlygramjan, monthlygramfeb, monthlygrammar, monthlygramapr } = response.data;
        console.log(response.data);
        this.monthlyGramChartData = {
          labels: ['1월', '2월', '3월', '4월'],
          datasets: [
            {
              type: 'line', // 차트 유형을 line으로 설정
              data: [monthlygramjan, monthlygramfeb, monthlygrammar, monthlygramapr],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              tension: 0.4, // 선의 곡률을 추가
            },
          ],
        };
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    },
  },
};
</script>

<style scoped>
/* 여기에 필요한 CSS 스타일을 추가하세요 */
</style>
