<template>
  <div>
    <div>
      <Radar v-if="loaded" :data="chartData" :options="radarChartOptions" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { Radar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'RadarChart',
  components: { Radar },

  props: {
    selectedStudentName: {
      type: String,
      default: '',
      required: true,
    },
  },

  watch: {
    selectedStudentName(newSelectedStudentName) {
      console.log('raDar.vue selectedStudentName: ', newSelectedStudentName);
      this.getStudentData();
    },
  },

  data: () => ({
    loaded: false,
    chartData: '',
    radarChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: 'easeInOutBack',
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: '과목별 점수 비교',
        },
      },
    },
  }),

  methods: {
    getStudentData() {
      axios
        .get(
          `https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/radarData.json`
        )
        .then(res => {
          const studentData = res.data.find(student => student.name === this.selectedStudentName);

          if (studentData) {
            const { ttlgrScore, ttlvcScore, ttllgScore, ttlrdScore } = studentData;

            this.updateChartData(ttlgrScore, ttlvcScore, ttllgScore, ttlrdScore);
          } else {
            console.log('Student data not found for', this.selectedStudentName);
          }
        })
        .catch(error => {
          console.log('error: ', error);
        });
    },

    updateChartData(ttlgrScore, ttlvcScore, ttllgScore, ttlrdScore) {
      this.chartData = {
        labels: ['문법', '어휘', '논리', '독해'],
        datasets: [
          {
            label: this.selectedStudentName,
            data: [ttlgrScore, ttlvcScore, ttllgScore, ttlrdScore],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
          },
          {
            label: '전체 평균',
            // data: [ttlgrScore, ttlvcScore, ttllgScore, ttlrdScore],
            data: [47.3, 36.0, 50.9, 52.7],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      };
      this.loaded = true;
    },
  },

  mounted() {
    if (this.selectedStudentName) {
      this.getStudentData();
    }
  },
};
</script>
<style></style>
