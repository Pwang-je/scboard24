<template>
  <div>
    <DataTable
      v-if="filteredData.length > 0"
      :value="filteredData"
      :rowClass="rowClass"
      paginator
      :rows="20"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      dataKey="id"
      stripedRows
      selectionMode="single"
      responsiveLayout="scroll"
      scrollable
      scrollHeight="600px"
    >
      <Column
        field="stdName"
        header="이름"
        sortable
        style="min-width: 100px"
      ></Column>

      <!-- NOTE -. This part shows the colour change for each Department. -->
      <Column field="dePart" header="분원" sortable style="min-width: 100px">
        <template #body="slotProps">
          <span :class="getDepotClass(slotProps.data.dePart)">{{
            slotProps.data.dePart
          }}</span>
        </template>
      </Column>

      <Column
        field="branCh"
        header="계열"
        sortable
        style="min-width: 120px"
      ></Column>
      <Column
        field="engScore"
        header="영어점수"
        sortable
        style="min-width: 120px"
      ></Column>
      <Column
        field="mathScore"
        header="수학점수"
        sortable
        style="min-width: 120px"
      ></Column>
      <template #footer>
        In total students are
        {{ filteredData ? filteredData.length : 0 }} students.</template
      >
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
    Column,
  },

  props: {
    selectedMonth: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      filteredData: [],
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
      },
    },
  },

  methods: {
    async loadData() {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/tableData.json'
        );
        this.filteredData = response.data[this.selectedMonth] || [];
        //IMPORTANT -. If MATH score is empty, treat as 'blank'.
        this.filteredData.forEach(item => {
          if (!item.mathScore) {
            item.mathScore = '';
          }
        });
      } catch (error) {
        console.error('Error loading data: ', error);
      }
    },
    getDepotClass(dePart) {
      if (dePart === '강남') return 'depot-gangnam';
      if (dePart === '듀이카') return 'depot-duica';
      if (dePart === '노원') return 'depot-nowon';
      if (dePart === '일산') return 'depot-ilsan';
      return '';
    },
  },
};
</script>

<style>
.depot-gangnam {
  padding: 0.4rem;
  border-radius: 0.8rem;
  background-color: rgb(255, 99, 132);
  color: #ffffff;
}
.depot-duica {
  padding: 0.4rem;
  border-radius: 0.8rem;
  background-color: rgb(255, 205, 86);
  color: #ffffff;
}
.depot-nowon {
  padding: 0.4rem;
  border-radius: 0.8rem;
  background-color: rgb(6, 166, 108);
  color: #ffffff;
}
.depot-ilsan {
  padding: 0.4rem;
  border-radius: 0.8rem;
  background-color: rgb(54, 162, 235);
  color: #ffffff;
}
</style>
