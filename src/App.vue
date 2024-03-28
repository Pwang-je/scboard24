<template>
  <div>
    <Dropdown
      v-model="selectedStudent"
      :options="students"
      optionLabel="name"
      placeholder="학생을 선택하세요"
    >
    </Dropdown>
    <cmpBarAvg :selected-student="selectedStudent" />
  </div>


  <div>
    <cmpBarAvg />
  </div>

</template>

<script>
import Dropdown from "primevue/dropdown";
import cmpBarAvg from "./components/bar/cmpBarAvg.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Dropdown,
    cmpBarAvg,
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
