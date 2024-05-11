<template>
	<div class="flex items-center justify-around col-span-2">
		<div class="text-lg text-center rounded-md stat-font">
			{{ studentInfo.engCls }}
		</div>

		<div class="text-lg text-center rounded-md stat-font">
			{{ studentInfo.mtCls }}
		</div>

		<div class="text-lg text-center rounded-md stat-font">
			{{ studentInfo.Cls }}
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'cmpStat',
	props: ['selectedStudentName'],

	data() {
		return {
			studentInfo: {
				name: '',
				engCls: '',
				mtCls: '',
				Cls: '',
				csatEng: '',
				csatMath: '',
			},
			loading: false,
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
					`https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/statData.json?name=${this.selectedStudentName}`,
				);

				console.log('selected name : ', this.selectedStudentName);

				const selectedStudent = response.data.find(
					student => student.name === this.selectedStudentName,
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

<style></style>
