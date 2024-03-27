<template>

  <div>
    <Dropdown v-model="selectedStudent"
              :options="students"
              optionLabel="name"
              placeholder="학생을 선택하세요">
    </Dropdown>
    <cmp-bar :selected-student="selectedStudent" />

  </div>

  <div>
    <CmpBar/>
  </div>

</template>

<script>
import Dropdown from 'primevue/dropdown';
import CmpBar from "@/components/bar/cmpBar.vue";
import axios from "axios";

export default {
  name: 'App',
  components: {
    Dropdown,
    CmpBar
  },

  data() {
    return {
      selectedStudent: null,
      students: []
      }
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
    }

  }


</script>

<style>

</style>
