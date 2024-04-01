<template>
  <div>
    <Dropdown
      v-model="selectedStudent"
      :options="students"
      optionLabel="name"
      placeholder="학생을 선택하세요"
    >
    </Dropdown>
    <cmpEngBarAvg :selected-student="selectedStudent" />
    <cmpMathBarAvg v-if="hasMathScores" :selected-student="selectedStudent" />
  </div>


  <div>
    <cmpEngBarAvg />
  </div>


  <div>
    <cmpMathBarAvg />
  </div>

</template>

<script>
import Dropdown from "primevue/dropdown";
import cmpEngBarAvg from "./components/bar/cmpEngBarAvg.vue";
import cmpMathBarAvg from "./components/bar/cmpMathBarAvg.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Dropdown,
    cmpEngBarAvg,
    cmpMathBarAvg,
  },

  data() {
    return {
      selectedStudent: null,
      students: [],
      hasMathScores: false,  // 수학 점수 존재 여부 확인
    };
  },

  created() {
    axios
      .get("https://raw.githubusercontent.com/Pwang-je/ScoreBoard/main/appData.json")
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    this.checkMathScores();
    },

  watch: {
    selectedStudent(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkMathScores();
      }
    }
  },

  methods: {
  // 선택된 학생의 수학 점수 존재 여부를 확인합니다.
  checkMathScores() {
    if (this.selectedStudent) {
      // totmath* 속성들만 필터링하여 유효한 점수가 있는지 확인합니다.
      this.hasMathScores = Object.keys(this.selectedStudent)
        .filter(key => key.startsWith('totmath')) // 'totmath'로 시작하는 키만 필터링
        .some(key => this.selectedStudent[key] !== ""); // 해당 키에 해당하는 값이 비어있지 않은지 확인
    } else {
      this.hasMathScores = false; // 선택된 학생이 없으면 false
    }
  }
},


};
</script>

<style></style>
