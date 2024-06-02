<template>
	<div class="container mx-auto">
		<!-- TODO -. this part will changing. -->
		<div class="grid grid-cols-2 m-4">
			<div class="flex justify-center h-20 p-4">
				<img src="@/assets/img/N_logo.png" class="img-size" />
			</div>
			<div class="inline-block pt-4 text-left align-middle text-slate-500">
				<span class="font-semibold"> 'N' &nbsp;2024y &nbsp;#2 </span><br />
				<span class="font-semibold"> &nbsp; 130 Members </span>
			</div>
		</div>

		<div class="grid content-center grid-cols-3 m-4">
			<div class="col-span-1">
				<Dropdown
					v-model="selectedStudent"
					:options="students"
					optionLabel="name"
					placeholder="Name"
					filter
					class="w-full"
				>
				</Dropdown>
			</div>

			<div class="content-center col-span-2 gap-1">
				<cmpStat :selectedStudentName="selectedStudent ? selectedStudent.name : ''" class="" />
			</div>
		</div>

		<div class="container">
			<span v-if="selectedStudent" class="p-3 text-xl font-bold text-900">
				<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-chart-bar"></span>
				&nbsp; 과목별 &nbsp; '영어' &nbsp; 점수
			</span>
			<cmpEngBarAvg :selected-student="selectedStudent" />
		</div>

		<div class="container grid p-3">
			<div class="grid grid-cols-1">
				<span v-if="selectedStudent" class="text-xl font-bold text-900">
					<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-sort-alt"></span>
					&nbsp; 지난달 대비 성적 증감률&nbsp; _ &nbsp;전체 분원 (100점 환산 기준)</span
				>
			</div>
			<div class="grid grid-cols-2 gap-4 mt-4">
				<cmpGrammar v-if="selectedStudent" class="rounded-lg shadow-lg border-style" />
				<cmpVoca v-if="selectedStudent" class="rounded-lg shadow-lg border-style" />
				<cmpLogic v-if="selectedStudent" class="rounded-lg shadow-lg border-style" />
				<cmpRead v-if="selectedStudent" class="rounded-lg shadow-lg border-style" />
			</div>
		</div>

		<!-- <cmpEngBarMonthly v-if="selectedStudent" /> -->
		<div class="container pt-6">
			<span v-if="selectedStudent" class="p-3 text-xl font-bold text-900">
				<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-star-half"></span>
				&nbsp; 과목별&nbsp; 비교&nbsp; 점수 (100점 환산 기준)
			</span>
			<!-- <div class="grid grid-cols-1 mt-2"> -->
			<cmpRadar :selectedStudentName="selectedStudent ? selectedStudent.name : ''" />
			<!-- </div> -->
		</div>

		<div class="container pt-6" v-if="hasMathScores">
			<span v-if="selectedStudent" class="p-3 text-xl font-bold text-900">
				<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-chart-bar"></span>
				&nbsp; 과목별 &nbsp; '수학' &nbsp; 점수
			</span>
			<cmpMathBarAvg v-if="hasMathScores" :selected-student="selectedStudent" />
		</div>

		<div class="container">
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
			hasMathScores: true, // 수학 점수 존재 여부 확인
		};
	},

	mounted() {
		this.hasMathScores = !cmpMathBarAvg;
	},

	created() {
		axios
			.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/appData.json',
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
.img-size {
	width: 40px;
	height: 41px;
}
</style>
