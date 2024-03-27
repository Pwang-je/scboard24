<template>
    <div>
        <Bar
          :data="gramchartData"
          :options="gramchartOptions"
          v-if="gramchartData"
        />
    </div>
</template>
<script>
import axios from "axios";
import { Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
export default {
  props: ['selectedStudent'],
  name: "cmpBar",
  components: {
      Bar,
  },

  data() {
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        scales: {
          y: {
            max: 0,
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: "",
                size: 14,
              }
            }
          }
        }
      };

      return {
        students: [],
        selectStudent: '',

        gramchartData: null,
        gramchartOptions: {
          ...chartOptions,
          scales: { y: { max: 25 }, x: { grid: { display: false } } },
        }
      }
  },

  created() {
      axios
          .get("https://raw.githubusercontent.com/Pwang-je/ScoreBoard/main/appData.json")
          .then((response) => {
            this.students = response.data;

            this.updateGramChartData();

          })
          .catch((error) => {
            console.log("error:", error)
          });
  },

  watch: {
      selectedStudent() {
        this.updateGramChartData();
      }
  },

  methods: {
      updateGramChartData() {
        if (this.selectStudent) {
          const {
            gramjan, gramfeb, grammar
          } = this.selectStudent;
          this.gramchartData = {
            labels:[
              "1월",
              "2월",
              "3월",
            ],
            datasets: [
              {
                type: "bar",
                label: "문법",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
                data: [
                    gramjan, gramfeb, grammar,
                ],
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


  //   next updateVocaChartData()


  }


}
</script>
<style>
    
</style>