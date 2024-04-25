<template>
  <div class="test-pie">
    <Dropdown
      v-model="selectedMonth"
      :options="formattedMonthlyData"
      optionLabel="label"
      optionValue="value"
      placeholder="Select a month"
    />
    <Pie
      :data="selectedData"
      :options="pieChartOptions"
      v-if="selectedData && selectedMonth"
      :key="selectedMonth"
    />
  </div>
  
  <div>
    <cmpSct 
      v-if="selectedMonth"
      :selected-month="selectedMonth"
    />
  </div>

  <div>
    <cmpTable
        v-if="selectedMonth"
        :selected-month="selectedMonth"
    />
  </div>

</template>

<script>
import { ref, computed, } from "vue";
import Dropdown from "primevue/dropdown";
import { Pie } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import cmpSct from "../scatter/cmpSct.vue";
import cmpTable from "../datatable/cmpTable.vue";

Chart.register(...registerables);

export default {
  name: "cmpPie",
  components: {
    Dropdown,
    Pie,
    cmpSct,
    cmpTable,
  },
  setup() {
    const selectedMonth = ref("");
    const monthlyData = ref([
      {
        month: "January",
        data: [0, 4, 9, 12, 19, 23, 19, 15, 5, 2],
      },
      {
        month: "february",
        data: [2, 5, 21, 24, 28, 40, 16, 16, 2, 0],
      },
      {
        month: "March",
        data: [0, 12, 61, 90, 84, 42, 29, 11, 1, 0],
      },


      // 추가 월별 데이터...
    ]);

    const formattedMonthlyData = computed(() =>
      monthlyData.value.map((item) => ({ label: item.month, value: item.month }))
    );

    const pieChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "점수별 인원 분포",
        },        
      },
      animation: {
        duration: 600,
        easing: 'easeIn'
      },
    });

    const selectedData = computed(() => {
      const data = monthlyData.value.find((d) => d.month === selectedMonth.value);
      if (data) {
        return {
          labels: [
            "0-10",
            "11-20",
            "21-30",
            "31-40",
            "41-50",
            "51-60",
            "61-70",
            "71-80",
            "81-90",
            "91-100",
          ],
          datasets: [
            {
              data: data.data,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(63, 81, 181)",
                "rgb(153, 102, 255)",
                "rgb(255, 192, 203)",
                "rgb(165, 42, 42)",
                "rgb(201, 203, 207)",
              ],
              hoverOffset: 4,
            },
          ],
        };
      }
      return null;
    });

    return {
      selectedMonth,
      formattedMonthlyData,
      pieChartOptions,
      selectedData,
    };
  },

};
</script>

<style>
.test-pie {
  width: 100%;
  height: 400px;
}
</style>
