<template>
  <div></div>
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
        y: { max: 0},
      },
      title: {
        display: true,
        align: 'start',
        font: {
          size: 15,
          weight: 'bold',
          family: 'omyu_pretty'
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
    },
  
    return {
      monthyGramChartData: null,
      monthyChartOptions: {
        ...chartOptions,
        plugins: {
          ...chartOptions.plugins,
          title: {
            ...chartOptions.plugins.title,
            text: 'Gram'
          },
        },
      }
    }
  },

  created() {
    
  },

  methods: {

    async updateMonthyGramChartData() {
      const response = await axios.get('');
    }



  }


};
</script>
<style></style>
