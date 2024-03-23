<template>

  <div>
    <select v-model="selectedStudent">
      <option v-for="student in students" :key="student.id" :value="student.name">
        {{ student.name }}
      </option>
    </select>

    <cmp-bar :selected-student="selectedStudent" />

  </div>

</template>

<script>
import CmpBar from "@/components/bar/cmpBar.vue";

export default {
  name: 'App',
  components: {
    'cmp-bar': CmpBar
  },

  data() {
    return {
      selectedStudent: '',
      students: [
        { id: 1, name: '김철수'},
        { id: 2, name: '이영희'}
      ]
      }
    }
  }


</script>

<style>

</style>
