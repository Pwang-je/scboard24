<template>
  <swiper :slides-per-view="1" :pagination="{ dynamicBullets: true }" :modules="modules">

    <swiper-slide>
      <div class="test-bar">
        <Bar :data="clCls1ChartData" :options="clCls1ChartOptions" v-if="clCls1ChartData" />
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="test-bar">
        <Bar :data="clCls2ChartData" :options="clCls2ChartOptions" v-if="clCls2ChartData" />
      </div>
    </swiper-slide>


    <swiper-slide>
      <div class="test-bar">
        <Bar :data="clCls3ChartData" :options="clCls3ChartOptions" v-if="clCls3ChartData" />
      </div>
    </swiper-slide>

    <swiper-slide>
      <div class="test-bar">
        <Bar :data="lnrAlgbrChartData" :options="lnrAlgbrChartOptions" v-if="lnrAlgbrChartData" />
      </div>
    </swiper-slide>


  </swiper>

  <div class="test-bar">
    <bar :data="totalMathChartData" :options="totalMathChartOptions" v-if="totalMathChartData" />
  </div>



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
  name: "cmpMathBar",
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
      
      clCls1ChartData: null,
      clCls1ChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      clCls2ChartData: null,
      clCls2ChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      clCls3ChartData: null,
      clCls3ChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      lnrAlgbrChartData: null,
      lnrAlgbrChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      mltvrChartData: null,
      mltvrChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      engnrChartData: null,
      engnrChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
      },

      totalMathChartData: null,
      totalMathChartOptions: {
        ...chartOptions,
        scales: { y: { max: 100 }, x: { grid: { display: false } } },
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
        await this.updateClcls1ChartData();
        await this.updateClcls2ChartData();
        await this.updateClcls3ChartData();
        await this.updateLnrAlgbrChartData();
        await this.updateMltvrChartData();
        await this.updateEngnrChartData();
        await this.updateTotalMathChartData();
      }
    },


    async updateClcls1ChartData() {
      const response = await axios.get("https://raw.githubusercontent.com/Pwang-je/scboard24/master/avgCls1.json");
      const avgCls1Data = response.data; 

      if (this.selectedStudent) {
        const { clcls1feb, clcls1mar, clcls1apr } = this.selectedStudent;

        this.clCls1ChartData = {
          labels: ["2월", "3월", "4월"],
          datasets: [
            {
              type: "bar",
              label: "미적분1",
              backgroundColor: "rgba(102, 205, 170, 0.2)",
              borderColor: "rgb(102, 205, 170)",
              data: [clcls1feb, clcls1mar, clcls1apr],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                avgCls1Data.avgCls1Feb,
                avgCls1Data.avgCls1Mar,
                avgCls1Data.avgCls1Apr,
              ],
              backgroundColor: "rgb(102, 205, 170, 0.4)",
              borderColor: "rgb(102, 205, 170, 0.4)",
            },
          ],
        };
      }
    },

    async updateClcls2ChartData() {
      const response = await axios.get("https://raw.githubusercontent.com/Pwang-je/scboard24/master/avgCls2.json");
      const avgCls2Data = response.data;
      
      if (this.selectedStudent) {
        const { clcls2mar, clcls2apr } = this.selectedStudent;

        this.clCls2ChartData = {
          labels: ["3월", "4월"],
          datasets: [
            {
              type: "bar",
              label: "미적분2",
              backgroundColor: "rgba(204, 122, 198, 0.2)",
              borderColor: "rgb(204, 122, 198)",
              data: [clcls2mar, clcls2apr],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                avgCls2Data.avgCls2Mar,
                avgCls2Data.avgCls2Apr,
              ],
              backgroundColor: "rgb(204, 122, 198, 0.4)",
              borderColor: "rgb(204, 122, 198, 0.4)",
            },
          ],
        };
      }
    },

    async updateClcls3ChartData() {
      const response = await axios.get("https://raw.githubusercontent.com/Pwang-je/scboard24/master/avgCls3.json");
      const avgCls3Data = response.data; 

      // console.log("avgLogicData : ", avgLogicData)

      if (this.selectedStudent) {
        const { clcls3may } = this.selectedStudent;

        this.clCls3ChartData = {
          labels: ["5월"],
          datasets: [
            {
              type: "bar",
              label: "미적분3",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgb(255, 159, 64)",
              data: [clcls3may],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                avgCls3Data.avgLogicJan,
              ],
              backgroundColor: "rgb(255, 159, 64, 0.4)",
              borderColor: "rgb(255, 159, 64, 0.4)",
            },
          ],
        };
      }
    },

    async updateLnrAlgbrChartData() {
      // const response = await axios.get("");
      // const avgAlgbraData = response.data;

      if (this.selectedStudent) {
        const { algbrajun, algbrajul } = this.selectedStudent;

        this.lnrAlgbrChartData = {
          labels: ["6월"],
          datasets: [
            {
              type: "bar",
              label: "선형대수학",
              backgroundColor: "rgba(197, 167, 63, 0.2)",
              borderColor: "rgb(197, 167, 63)",
              data: [algbrajun, algbrajul],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                // avgAlgbraData.avgReadJan,
              ],
              backgroundColor: "rgb(197, 167, 63, 0.4)",
              borderColor: "rgb(197, 167, 63, 0.4)",
            },
          ],
        };
      }
    },

    async updateTotalMathChartData() {
      const response = await axios.get("");
      const avgMathTotData = response.data;

      if (this.selectedStudent) {
        const { totmathfeb, totmathmar, totmathapr } = this.selectedStudent;

        this.totalMathChartData = {
          labels: ["2월", "3월", "4월"],
          datasets: [
            {
              type: "bar",
              label: "총점",
              backgroundColor: "rgba(160, 160, 160, 0.2)",
              borderColor: "rgb(160, 160, 160)",
              data: [ totmathfeb, totmathmar, totmathapr ],
              borderWidth: 2,
            },
            {
              type: "line",
              label: "평균",
              data: [
                avgMathTotData.avgTotJan,
                avgMathTotData.avgTotFeb,
                avgMathTotData.avgTotMar,
              ],
              backgroundColor: "rgb(160, 160, 160, 0.4)",
              borderColor: "rgb(160, 160, 160, 0.4)",
            },
          ],
        };
      }
    },











  },
};
</script>

<style></style>
