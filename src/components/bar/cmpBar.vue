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
    this.updateGramChartData();
    this.updateVocaChartData();
  },

  watch: {
    selectedStudent() {
      this.updateGramChartData();
      this.updateVocaChartData();
    },
  },

  methods: {
    updateGramChartData() {
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
              datalabels: {
                anchor: "start",
                align: "start",
                offset: "-35",
              },
            },
            {
              type: "line",
              label: "평균",
              data: [],
              backgroundColor: "rgb(255, 99, 132, 0.4)",
              borderColor: "rgb(255, 99, 132, 0.4)",
              datalabels: {
                anchor: "start",
                align: "start",
                offset: "15",
              },
            },
          ],
        };
      }
    },

    updateVocaChartData() {
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
              datalabels: {
                anchor: "start",
                align: "start",
                offset: "-35",
              },
            },
            {
              type: "line",
              label: "어휘",
              data: [],
              backgroundColor: "rgb(54, 162, 235, 0.4)",
              borderColor: "rgb(54, 162, 235, 0.4)",
              datalabels: {
                anchor: "start",
                align: "start",
                offset: "15",
              },
            },
          ],
        };
      }
    },
  },
};
</script>

<style></style>
