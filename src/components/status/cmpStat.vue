<template>
  <div class="flex items-center justify-around col-span-2">
    <div class="text-center rounded-md stat-font">
      {{ studentInfo.engCls }}
    </div>

    <div class="text-center rounded-md stat-font">
      {{ studentInfo.mtCls }}
    </div>

    <div class="text-center rounded-md stat-font">
      {{ studentInfo.Cls }}
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'cmpStat',
  props: ['selectedStudentName'], // prop에서 props로 변경

  data() {
    return {
      studentInfo: {
        name: '',
        engCls: '', // engClas에서 engCls로 변경
        mtCls: '',
        Cls: '',
        csatEng: '',
        csatMath: '',
      },
      loading: false, // 로딩 상태 추가
    };
  },

  watch: {
    selectedStudentName(newSelectedStudentName) {
      console.log('cmpStat.vue selectedStudentName: ', newSelectedStudentName);
      this.getStudentData();
    },
  },

  methods: {
    async getStudentData() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/statData.json?name=${this.selectedStudentName}`
        ); // 백틱과 ${} 수정

        console.log('selected name : ', this.selectedStudentName);

        const selectedStudent = response.data.find(
          student => student.name === this.selectedStudentName
        );

        if (selectedStudent) {
          this.studentInfo = selectedStudent;
        } else {
          console.error('Student name not found.');
        }
      } catch (error) {
        console.error('Error retrieving student data: ', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.stat-font {
  font-size: 14px;
}
</style>
