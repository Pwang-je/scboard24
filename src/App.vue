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
    <cmpMathBarAvg :selected-student="selectedStudent" />
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
  },
};
</script>

<style></style>
