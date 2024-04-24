<template>
  <div>
    <!-- 데이터가 있을 때만 DataTable을 보여줍니다 -->
    <DataTable
      v-if="filteredData.length > 0"
      :value="filteredData"
      paginator :rows="20"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="id"
      striped
      responsiveLayout="scroll"
    >
      <Column field="stdName" header="이름" sortable></Column>
      <Column field="dePart" header="분원"></Column>
      <Column field="branCh" header="계열" sortable></Column>
      <Column field="engScore" header="영어점수" sortable></Column>
      <Column field="mathScore" header="수학점수" sortable></Column>
    </DataTable>
    <p v-else>선택된 월에 해당하는 데이터가 없습니다.</p>
  </div>

<!-- 테이블 디자인 해야됨. 크기조절!! -->
</template>

<script>
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'MonthlyDataView',
  components: {
    DataTable,
    Column
  },

  props: {
    selectedMonth: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      filteredData: []
    };
  },

  created() {
    this.loadData();
  },

  watch: {
    selectedMonth: {
      immediate: true,
      handler() {
        this.loadData();
      }
    }
  },

  methods: {
    async loadData() {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/tableData.json');
        this.filteredData = response.data[this.selectedMonth] || [];
        // 수학 점수가 비어있는 경우 'N/A'로 처리
        this.filteredData.forEach(item => {
          if (!item.mathScore) {
            item.mathScore = '';
          }
        });
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    }
  }
}
</script>
