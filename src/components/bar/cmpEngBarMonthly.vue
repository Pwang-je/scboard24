<template>
  <div>
    <Bar
      :data="monthyGramChartData"
      :options="chartOptions"
      v-if="monthyGramChartData"
    />
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'cmpMonthly',
  components: {
    Bar,
  },

  data() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      scales: {
        y: { max: 100 },
      },
      plugins: {
        legend: {
          labels: {
            font: { family: 'omyu_pretty', size: 14 },
          },
        },
        title: {
          display: true,
          align: 'start',
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
      monthyGramChartData: null,
      monthyChartOptions: {
        ...chartOptions,
        plugins: {
          ...chartOptions.plugins,
          title: {
            ...chartOptions.plugins.title,
            text: '문법',
          },
        },
        scales: { y: { max: 25 }, x: { grid: { display: false } } },
      },
    };
  },

  created() {
    this.updateMonthyGramChartData();
  },
  // TODO -. something problems here.
  methods: {
    async updateMonthyGramChartData() {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/monthlyScore.json'
      );
      const mhyData = response.data;
      console.log(mhydata);

      const { gramjan, gramfeb, grammar, gramapr } = mhyData;
      this.monthyGramChartData = {
        labels: ['1', '2', '3', '4'],
        datasets: [
          {
            type: 'line',
            data: [gramjan, gramfeb, grammar, gramapr],
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      };
    },
  },
};
</script>
<style></style>
