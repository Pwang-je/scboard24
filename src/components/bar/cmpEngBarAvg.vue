<template>
	<swiper :slides-per-view="1" :pagination="{ dynamicBullets: true }" :modules="modules">
		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="gramChartData"
					:options="gramchartOptions"
					v-if="gramChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="vocaChartData"
					:options="vocaChartOptions"
					v-if="vocaChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="logicChartData"
					:options="logicChartOptions"
					v-if="logicChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>

		<swiper-slide>
			<div class="p-4 pb-6">
				<Bar
					:data="readChartData"
					:options="readChartOptions"
					v-if="readChartData"
					class="p-2 bg-white rounded-lg shadow-lg border-style h-96"
				/>
			</div>
		</swiper-slide>
	</swiper>

	<div class="p-4 pb-6">
		<bar
			:data="totEngChartData"
			:options="totEngChartOptions"
			v-if="totEngChartData"
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

//NOTE -. import swiper module styles
import 'swiper/css';
import 'swiper/css/pagination';

Chart.register(...registerables);

export default {
	props: ['selectedStudent'],
	name: 'cmpEngBar',
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
						font: { family: 'skbori', size: 14 },
					},
				},
				title: {
					display: true,
					// align: 'start',
					// position: 'left',
					// text: 'dt',
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
			gramChartData: null,
			gramchartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '문법',
					},
				},
				scales: { y: { max: 25 }, x: { grid: { display: false } } },
			},

			vocaChartData: null,
			vocaChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '어휘',
					},
				},
				scales: { y: { max: 12.5 }, x: { grid: { display: false } } },
			},

			logicChartData: null,
			logicChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '논리',
					},
				},
				scales: { y: { max: 12.5 }, x: { grid: { display: false } } },
			},

			readChartData: null,
			readChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '독해',
					},
				},
				scales: { y: { max: 50 }, x: { grid: { display: false } } },
			},

			totEngChartData: null,
			totEngChartOptions: {
				...chartOptions,
				plugins: {
					...chartOptions.plugins,
					title: {
						...chartOptions.plugins.title,
						text: '영어 총점',
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
				await this.updateGramChartData();
				await this.updateVocaChartData();
				await this.updateLogicChartData();
				await this.updateReadChartData();
				await this.updateTotalEngChartData();
			}
		},

		async updateGramChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/eng/avgGram.json',
			);
			const avgGramData = response.data;

			if (this.selectedStudent) {
				const { gramjan, gramfeb, grammar, gramapr, grammay, gramjun, gramjul, gramaug } =
					this.selectedStudent;

				this.gramChartData = {
					labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
							borderColor: 'rgb(255, 99, 132)',
							data: [gramjan, gramfeb, grammar, gramapr, grammay, gramjun, gramjul, gramaug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgGramData.avgGramJan,
								avgGramData.avgGramFeb,
								avgGramData.avgGramMar,
								avgGramData.avgGramApr,
								avgGramData.avgGramMay,
								avgGramData.avgGramJun,
								avgGramData.avgGramJul,
								avgGramData.avgGramAug,
							],
							backgroundColor: 'rgb(255, 99, 132, 0.6)',
							borderColor: 'rgb(255, 99, 132, 0.6)',
						},
					],
				};
			}
		},

		async updateVocaChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/eng/avgVoca.json',
			);
			const avgVocaData = response.data;

			if (this.selectedStudent) {
				const { vocajan, vocafeb, vocamar, vocaapr, vocamay, vocajun, vocajul, vocaaug } =
					this.selectedStudent;

				this.vocaChartData = {
					labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							borderColor: 'rgb(54, 162, 235)',
							data: [vocajan, vocafeb, vocamar, vocaapr, vocamay, vocajun, vocajul, vocaaug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgVocaData.avgVocaJan,
								avgVocaData.avgVocaFeb,
								avgVocaData.avgVocaMar,
								avgVocaData.avgVocaApr,
								avgVocaData.avgVocaMay,
								avgVocaData.avgVocaJun,
								avgVocaData.avgVocaJul,
								avgVocaData.avgVocaAug,
							],
							backgroundColor: 'rgb(54, 162, 235, 0.6)',
							borderColor: 'rgb(54, 162, 235, 0.6)',
						},
					],
				};
			}
		},

		async updateLogicChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/eng/avgLogic.json',
			);
			const avgLogicData = response.data;

			// console.log("avgLogicData : ", avgLogicData)

			if (this.selectedStudent) {
				const { logicjan, logicfeb, logicmar, logicapr, logicmay, logicjun, logicjul, logicaug } =
					this.selectedStudent;

				this.logicChartData = {
					labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(255, 159, 64, 0.2)',
							borderColor: 'rgb(255, 159, 64)',
							data: [
								logicjan,
								logicfeb,
								logicmar,
								logicapr,
								logicmay,
								logicjun,
								logicjul,
								logicaug,
							],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgLogicData.avgLogicJan,
								avgLogicData.avgLogicFeb,
								avgLogicData.avgLogicMar,
								avgLogicData.avgLogicApr,
								avgLogicData.avgLogicMay,
								avgLogicData.avgLogicJun,
								avgLogicData.avgLogicJul,
								avgLogicData.avgLogicAug,
							],
							backgroundColor: 'rgb(255, 159, 64, 0.6)',
							borderColor: 'rgb(255, 159, 64, 0.6)',
						},
					],
				};
			}
		},

		async updateReadChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/eng/avgRead.json',
			);
			const avgReadData = response.data;

			if (this.selectedStudent) {
				const { readjan, readfeb, readmar, readapr, readmay, readjun, readjul, readaug } =
					this.selectedStudent;

				this.readChartData = {
					labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(75, 192, 192, 0.2)',
							borderColor: 'rgb(75, 192, 192)',
							data: [readjan, readfeb, readmar, readapr, readmay, readjun, readjul, readaug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgReadData.avgReadJan,
								avgReadData.avgReadFeb,
								avgReadData.avgReadMar,
								avgReadData.avgReadApr,
								avgReadData.avgReadMay,
								avgReadData.avgReadJun,
								avgReadData.avgReadJul,
								avgReadData.avgReadAug,
							],
							backgroundColor: 'rgb(75, 192, 192, 0.6)',
							borderColor: 'rgb(75, 192, 192, 0.6)',
						},
					],
				};
			}
		},

		async updateTotalEngChartData() {
			const response = await axios.get(
				'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/eng/avgTot.json',
			);
			const avgTotData = response.data;

			if (this.selectedStudent) {
				const { totjan, totfeb, totmar, totapr, totmay, totjun, totjul, totaug } =
					this.selectedStudent;

				this.totEngChartData = {
					labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월'],
					datasets: [
						{
							type: 'bar',
							label: `${this.selectedStudent.name}`,
							backgroundColor: 'rgba(160, 160, 160, 0.2)',
							borderColor: 'rgb(160, 160, 160)',
							data: [totjan, totfeb, totmar, totapr, totmay, totjun, totjul, totaug],
							borderWidth: 2,
							borderRadius: [{ topLeft: 20, topRight: 20 }],
						},
						{
							type: 'line',
							label: '평균',
							data: [
								avgTotData.avgTotJan,
								avgTotData.avgTotFeb,
								avgTotData.avgTotMar,
								avgTotData.avgTotApr,
								avgTotData.avgTotMay,
								avgTotData.avgTotJun,
								avgTotData.avgTotJul,
								avgTotData.avgTotAug,
							],
							backgroundColor: 'rgb(160, 160, 160, 0.6)',
							borderColor: 'rgb(160, 160, 160, 0.6)',
						},
					],
				};
			}
		},
	},
};
</script>

<style>
.border-style {
	border: 1px solid #f5f5f5;
}
* {
	font-family: 'skbori', sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 1rem;
}
</style>
