<template>
	<div>
		<div v-for="chartData in chartsData" :key="chartData.title">
			<Line :data="chartData.data" :options="chartData.options" v-if="chartData.data" />
		</div>
	</div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
	name: 'cmpCharts',
	components: {
		Line,
	},
	data() {
		return {
			chartsData: [
				{ key: 'grammar', title: '문법', data: null, options: this.baseOptions('문법') },
				{ key: 'vocabulary', title: '어휘', data: null, options: this.baseOptions('어휘') },
				{ key: 'logic', title: '논리', data: null, options: this.baseOptions('논리') },
				{ key: 'reading', title: '독해', data: null, options: this.baseOptions('독해') },
			],
		};
	},
	created() {
		this.loadAllChartData();
	},
	methods: {
		baseOptions(title) {
			return {
				responsive: true,
				maintainAspectRatio: false,
				devicePixelRatio: 2,
				scales: {
					y: {
						suggestedMax: 100,
						grid: { display: false },
						display: false,
					},
					x: { display: false, grid: { display: false } },
				},
				plugins: {
					legend: { display: false },
					title: {
						display: true,
						text: title,
						align: 'start',
						font: { size: 30, weight: 'bold', family: 'omyu_pretty' },
						padding: { top: 0, bottom: 5 },
					},
				},
				animation: { duration: 1200, easing: 'easeInOutBack' },
			};
		},
		async loadAllChartData() {
			try {
				const response = await axios.get(
					'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/monthlyScore.json',
				);
				this.chartsData.forEach(chart => {
					const baseKey = `monthly${chart.key}`;
					chart.data = {
						labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월'],
						datasets: [
							{
								type: 'line',
								data: [
									response.data[`${baseKey}jan`],
									response.data[`${baseKey}feb`],
									response.data[`${baseKey}mar`],
									response.data[`${baseKey}apr`],
									response.data[`${baseKey}may`],
									response.data[`${baseKey}jun`],
									response.data[`${baseKey}jul`],
									response.data[`${baseKey}aug`],
								],
								backgroundColor: 'rgba(255, 99, 132, 0.5)',
								borderColor: 'rgb(255, 99, 132)',
								borderWidth: 2,
								tension: 0.4,
							},
						],
					};
				});
			} catch (error) {
				console.error('Data fetch error:', error);
			}
		},
	},
};
</script>

<style scoped>
/* 스타일 추가 */
</style>
