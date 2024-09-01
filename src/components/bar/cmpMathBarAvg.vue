<template>
	<swiper :slides-per-view="1" :pagination="{ dynamicBullets: true }" :modules="modules">
		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="clCls1ChartData"
					:options="clCls1ChartOptions"
					v-if="clCls1ChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="clCls2ChartData"
					:options="clCls2ChartOptions"
					v-if="clCls2ChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="clCls3ChartData"
					:options="clCls3ChartOptions"
					v-if="clCls3ChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="lnrAlgbrChartData"
					:options="lnrAlgbrChartOptions"
					v-if="lnrAlgbrChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>
	</swiper>

	<div class="p-4 pb-6">
		<bar
			:data="totalMathChartData"
			:options="totalMathChartOptions"
			v-if="totalMathChartData"
			class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
		/>
	</div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { Pagination } from 'swiper';
import axios from 'axios';

// import swiper module styles
import 'swiper/css';
import 'swiper/css/pagination';

Chart.register(...registerables);

export default {
	props: ['selectedStudent'],
	name: 'cmpMathBar',
	components: {
		Swiper,
		SwiperSlide,
		Bar,
	},

	setup() {
		return {
			modules: [Pagination],
		};
	},

	data() {
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			devicePixelRatio: 2,
			scales: {
				y: { max: 0 },
			},
			plugins: {
				legend: {
					labels: {
						font: { size: 14, family: 'skbori' },
					},
				},
				title: {
					display: true,
					font: {
						size: 24,
						weight: 'normal',
						family: 'skbori',
					},
					padding: {
						top: 0,
						bottom: 5,
					},
				},
			},
			animation: {
				duration: 1200,
				easing: 'easeInOutBack',
			},
		};

		return {
			clCls1ChartData: null,
			clCls1ChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '미적분 1',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			clCls2ChartData: null,
			clCls2ChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '미적분 2',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			clCls3ChartData: null,
			clCls3ChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '미적분 3',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			lnrAlgbrChartData: null,
			lnrAlgbrChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '선형대수학',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			mltvrChartData: null,
			mltvrChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '다변수미적분',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			engnrChartData: null,
			engnrChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '공학수학',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},

			totalMathChartData: null,
			totalMathChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '수학 총점',
					},
				},
				scales: { y: { max: 100 }, x: { grid: { display: false } } },
			},
		};
	},

	created() {
		this.fetchDataAndUpdateCharts();
	},

	watch: {
		selectedStudent() {
			this.fetchDataAndUpdateCharts();
		},
	},

	methods: {
		async fetchDataAndUpdateCharts() {
			if (this.selectedStudent) {
				await this.updateClcls1ChartData();
				await this.updateClcls2ChartData();
				await this.updateClcls3ChartData();
				await this.updateLnrAlgbrChartData();
				await this.updateMltvrChartData();
				// await this.updateEngnrChartData();
				await this.updateTotalMathChartData();
			}
		},

		async updateClcls1ChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgCls1.json',
			);
			const avgCls1Data = response.data;

			if (this.selectedStudent) {
				const { clcls1feb, clcls1mar, clcls1apr, clcls1may, clcls1jun, clcls1jul, clcls1aug } =
					this.selectedStudent;

				this.clCls1ChartData = {
					labels: ['2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(102, 205, 170, 0.2)',
							borderColor: 'rgb(102, 205, 170)',
							data: [clcls1feb, clcls1mar, clcls1apr, clcls1may, clcls1jun, clcls1jul, clcls1aug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgCls1Data.avgCls1Feb,
								avgCls1Data.avgCls1Mar,
								avgCls1Data.avgCls1Apr,
								avgCls1Data.avgCls1May,
								avgCls1Data.avgCls1Jun,
								avgCls1Data.avgCls1Jul,
								avgCls1Data.avgCls1Aug,
							],
							backgroundColor: 'rgb(102, 205, 170, 0.6)',
							borderColor: 'rgb(102, 205, 170, 0.6)',
						},
					],
				};
			}
		},

		async updateClcls2ChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgCls2.json',
			);
			const avgCls2Data = response.data;

			if (this.selectedStudent) {
				const { clcls2apr, clcls2may, clcls2jun, clcls2jul, clcls2aug } = this.selectedStudent;

				this.clCls2ChartData = {
					labels: ['4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(204, 122, 198, 0.2)',
							borderColor: 'rgb(204, 122, 198)',
							data: [clcls2apr, clcls2may, clcls2jun, clcls2jul, clcls2aug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgCls2Data.avgCls2Apr,
								avgCls2Data.avgCls2May,
								avgCls2Data.avgCls2Jun,
								avgCls2Data.avgCls2Jul,
								avgCls2Data.avgCls2Aug,
							],
							backgroundColor: 'rgb(204, 122, 198, 0.6)',
							borderColor: 'rgb(204, 122, 198, 0.6)',
						},
					],
				};
			}
		},

		async updateClcls3ChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgCls3.json',
			);
			const avgCls3Data = response.data;

			// console.log("avgLogicData : ", avgLogicData)

			if (this.selectedStudent) {
				const { clcls3may, clcls3jun, clcls3jul, clcls3aug } = this.selectedStudent;

				this.clCls3ChartData = {
					labels: ['5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(255, 159, 64, 0.2)',
							borderColor: 'rgb(255, 159, 64)',
							data: [clcls3may, clcls3jun, clcls3jul, clcls3aug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgCls3Data.avgCls3May,
								avgCls3Data.avgCls3Jun,
								avgCls3Data.avgCls3Jul,
								avgCls3Data.avgCls3Aug,
							],
							backgroundColor: 'rgb(255, 159, 64, 0.4)',
							borderColor: 'rgb(255, 159, 64, 0.4)',
						},
					],
				};
			}
		},

		async updateLnrAlgbrChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgLnrAlgbr.json',
			);
			const avgAlgbraData = response.data;

			if (this.selectedStudent) {
				const { algbrajun, algbrajul, algbraaug } = this.selectedStudent;

				this.lnrAlgbrChartData = {
					labels: ['6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(197, 167, 63, 0.2)',
							borderColor: 'rgb(197, 167, 63)',
							data: [algbrajun, algbrajul, algbraaug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [avgAlgbraData.avgAlgJun, avgAlgbraData.avgAlgJul, avgAlgbraData.avgAlgAug],
							backgroundColor: 'rgb(197, 167, 63, 0.4)',
							borderColor: 'rgb(197, 167, 63, 0.4)',
						},
					],
				};
			}
		},

		async updateMltvrChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgMltvr.json',
			);
			const avgMltvrData = response.data;

			if (this.selectedStudent) {
				const { mltvraug } = this.selectedStudent;

				this.mltvrChartData = {
					labels: ['8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(102, 102, 255, 0.2)',
							borderColor: 'rgb(102, 102, 255)',
							data: [mltvraug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [avgMltvrData.avgMltvrAug],
							backgroundColor: 'rgb(102, 102, 255, 0.4)',
							borderColor: 'rgb(102, 102, 255, 0.4)',
						},
					],
				};
			}
		},

		async updateTotalMathChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/math/avgMathTot.json',
			);
			const avgMathTotData = response.data;

			if (this.selectedStudent) {
				const {
					totmathfeb,
					totmathmar,
					totmathapr,
					totmathmay,
					totmathjun,
					totmathjul,
					totmathaug,
				} = this.selectedStudent;

				this.totalMathChartData = {
					labels: ['2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(160, 160, 160, 0.2)',
							borderColor: 'rgb(160, 160, 160)',
							data: [
								totmathfeb,
								totmathmar,
								totmathapr,
								totmathmay,
								totmathjun,
								totmathjul,
								totmathaug,
							],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgMathTotData.avgMathTotFeb,
								avgMathTotData.avgMathTotMar,
								avgMathTotData.avgMathTotApr,
								avgMathTotData.avgMathTotMay,
								avgMathTotData.avgMathTotJun,
								avgMathTotData.avgMathTotJul,
								avgMathTotData.avgMAthTotAug,
							],
							backgroundColor: 'rgb(160, 160, 160, 0.4)',
							borderColor: 'rgb(160, 160, 160, 0.4)',
						},
					],
				};
			}
		},
	},
};
</script>

<style>
* {
	font-family: 'skbori', sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 1rem;
}
</style>
