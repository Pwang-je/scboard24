<template>
  <div>

  </div>
</template>

<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

  export default {
    name: "cmpTable",
    components: {
      DataTable,
    },
    props: {
      selectedMonth: {
        type: String,
        require: true, 
      },
    },


  }
</script>

<style>

</style>