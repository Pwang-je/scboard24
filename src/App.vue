<template>

  <div>
    <Dropdown v-model="selectedStudent"
              :options="students"
              optionLabel="name"
              placeholder="학생을 선택하세요">
    </Dropdown>
    <cmp-bar :selected-student="selectedStudent" />

  </div>

</template>

<script>
import Dropdown from 'primevue/dropdown';
import CmpBar from "@/components/bar/cmpBar.vue";

export default {
  name: 'App',
  components: {
    Dropdown,
    CmpBar
  },

  data() {
    return {
      selectedStudent: null,
      students: [
        { id: 1, name: '강현석'},
        { id: 2, name: '이영희'}
      ]
      }
    }
  }


</script>

<style>

</style>
