<template>
  <div>
    <DataTable 
      stripedRows
      paginator
      selectionMode="single"
      :rowsPerPageOptions="[5, 10, 15, 20]"
    >
      <Column field="stdName"></Column>
      <Column field="dePart"></Column>
      <Column field="branCh"></Column>
      <Column field="engScore"></Column>
      <Column field="mathScore"></Column>
    </DataTable>
    
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

  export default {
    name: "cmpTable",
    components: {
      DataTable,
      Column,
    },
    props: {
      selectedMonth: {
        type: String,
        require: false,
        default: "", 
      },
    },


    data() {
      return {
        key: value
      }
    },


  }
</script>

<style>

</style>