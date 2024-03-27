<template>
  <swiper :slides-per-view="1" :pagination="{ dynamicBullets: true }" :modules="modules">
    <swiper-slide>
      <div class="test-bar">
        <Bar :data="gramchartData" :options="gramchartOptions" v-if="gramchartData" />
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="test-bar">
        <Bar :data="vocaChartData" :options="vocaChartOptions" v-if="vocaChartData" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination } from "swiper";
import axios from "axios";

// import swiper module styles
import "swiper/css";
import "swiper/css/pagination";

Chart.register(...registerables);

export default {
  props: ["selectedStudent"],
  name: "cmpBar",
  components: {
    Swiper,
    SwiperSlide,
    Bar,
  },

  setup() {
    return {
      modules: [Pagination],
    };
  },

  data() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      scales: {
        y: { max: 0 },
      },
      plugins: {
        legend: {
          labels: {
            font: { family: "SUITE-SemiBold", size: 14 },
          },
        },
      },
    };

    return {
      gramchartData: null,
      gramchartOptions: {
        ...chartOptions,
        scales: { y: { max: 25 }, x: { grid: { display: false } } },
      },

      vocaChartData: null,
      vocaChartOptions: {
        ...chartOptions,
        scales: { y: { max: 12.5 }, x: { grid: { display: false } } },
      },
    };
  },

  created() {
    this.fetchDataAndUpdateCharts();
  },

  watch: {
    selectedStudent() {
      this.fetchDataAndUpdateCharts();
    },
  },

  methods: {
    async fetchDataAndUpdateCharts() {
      if (this.selectedStudent) {
        await this.updateGramChartData();
        await this.updateVocaChartData();
      }
    },

    async updateGramChartData() {
      const response = await axios.get("api_avg_gram");
      const avgData = response.data[0]; // API로부터 받은 평균값 데이터

      // 문법 차트 데이터 업데이트
      if (this.selectedStudent) {
        const { gramjan, gramfeb, grammar, gramapr } = this.selectedStudent;

        this.gramchartData = {
          labels: ["1월", "2월", "3월", "4월"],
          datasets: [
            {
              type: "bar",
              label: "문법",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              data: [gramjan, gramfeb, grammar, gramapr],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                parseFloat(avgData.avgjan),
                parseFloat(avgData.avgfeb),
                parseFloat(avgData.avgmar),
                parseFloat(avgData.avgapr),
              ],
              backgroundColor: "rgb(255, 99, 132, 0.4)",
              borderColor: "rgb(255, 99, 132, 0.4)",
            },
          ],
        };
      }
    },

    async updateVocaChartData() {
      const response = await axios.get("api_avg_voca");
      const avgData = response.data[0]; // API로부터 받은 평균값 데이터

      // 어휘 차트 데이터 업데이트
      if (this.selectedStudent) {
        const { vocajan, vocafeb, vocamar, vocaapr } = this.selectedStudent;

        this.vocaChartData = {
          labels: ["1월", "2월", "3월", "4월"],
          datasets: [
            {
              type: "bar",
              label: "어휘",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              data: [vocajan, vocafeb, vocamar, vocaapr],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                parseFloat(avgData.avgjan),
                parseFloat(avgData.avgfeb),
                parseFloat(avgData.avgmar),
                parseFloat(avgData.avgapr),
              ],
              backgroundColor: "rgb(54, 162, 235, 0.4)",
              borderColor: "rgb(54, 162, 235, 0.4)",
            },
          ],
        };
      }
    },
  },
};
</script>

<style></style>
