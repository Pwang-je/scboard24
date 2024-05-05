<template>
  <div class="container mx-auto">
    <div class="grid content-center grid-cols-3 m-4">
      <div class="col-span-1">
        <Dropdown
          v-model="selectedStudent"
          :options="students"
          optionLabel="name"
          placeholder="Select"
          filter
          class="w-full"
        >
        </Dropdown>
      </div>

      <div class="content-center col-span-2 gap-1">
        <cmpStat :selectedStudentName="selectedStudent ? selectedStudent.name : ''" class="" />
      </div>
    </div>

    <div>
      <cmpEngBarAvg :selected-student="selectedStudent" />
    </div>

    <!-- <cmpEngBarMonthly v-if="selectedStudent" /> -->
    <cmpGrammar v-if="selectedStudent" />
    <cmpVoca v-if="selectedStudent" />
    <cmpLogic v-if="selectedStudent" />
    <cmpRead v-if="selectedStudent" />

    <div>
      <cmpRadar
        :selectedStudentName="selectedStudent ? selectedStudent.name : ''"
        style="height: 100%"
      />
    </div>
    <div>
      <cmpMathBarAvg v-if="hasMathScores" :selected-student="selectedStudent" />
    </div>

    <div>
      <cmpPie />
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import cmpEngBarAvg from './components/bar/cmpEngBarAvg.vue';
import cmpMathBarAvg from './components/bar/cmpMathBarAvg.vue';
import cmpGrammar from './components/bar/cmpGrammar';
import cmpVoca from './components/bar/cmpVoca';
import cmpLogic from './components/bar/cmpLogic';
import cmpRead from './components/bar/cmpRead';

import cmpRadar from './components/radar/cmpRadar.vue';
import cmpPie from './components/pie/cmpPie.vue';
import cmpStat from './components/status/cmpStat.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Dropdown,
    cmpEngBarAvg,
    cmpGrammar,
    cmpVoca,
    cmpLogic,
    cmpRead,
    cmpMathBarAvg,
    cmpRadar,
    cmpPie,
    cmpStat,
  },

  data() {
    return {
      selectedStudent: null,
      students: [],
      hasMathScores: false, // 수학 점수 존재 여부 확인
    };
  },

  created() {
    axios
      .get(
        'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/appData.json'
      )
      .then(response => {
        this.students = response.data;
      })
      .catch(error => {
        console.log('Error:', error);
      });

    this.checkMathScores();
  },

  watch: {
    selectedStudent(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkMathScores();
      }
    },
  },

  methods: {
    // 선택된 학생의 수학 점수 존재 여부를 확인
    checkMathScores() {
      if (this.selectedStudent) {
        // totmath* 속성들만 필터링하여 유효한 점수가 있는지 확인
        this.hasMathScores = Object.keys(this.selectedStudent)
          .filter(key => key.startsWith('totmath')) // 'totmath'로 시작하는 키만 필터링
          .some(key => this.selectedStudent[key] !== ''); // 해당 키에 해당하는 값이 비어있지 않은지 확인
      } else {
        this.hasMathScores = false; // 선택된 학생이 없으면 false
      }
    },
  },
};
</script>

<style>

</style>
