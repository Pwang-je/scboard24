<template>
	<div class="container bg-white">
		<div class="grid">
			<h3 class="pl-6 text-xl">
				독해
				<span :class="arrowClass"
					><b>{{ changeIcon }}</b></span
				>
				{{ changeValue }}
			</h3>
		</div>
		<div class="h-24">
			<Line :data="chartData" :options="chartOptions" v-if="chartData" />
		</div>
	</div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
	name: 'CmpRead',
	components: { Line },
	data() {
		return {
			chartData: null,
			chartOptions: this.baseOptions('독해'),
			changeIcon: '',
			changeValue: 0,
		};
	},
	created() {
		this.chartOptions = this.baseOptions('독해'); // 차트 옵션 초기화
		this.loadChartData();
	},
	computed: {
		arrowClass() {
			return this.changeValue >= 0 ? 'arrow-up' : 'arrow-down';
		},
	},
	methods: {
		baseOptions() {
			return {
				responsive: true,
				maintainAspectRatio: false,
				devicePixelRatio: 2,
				scales: {
					y: {
						beginAtZero: true,
						suggestedMax: 100,
						grid: { display: false },
						display: false,
					},
					x: {
						display: false,
						grid: { display: false },
					},
				},
				plugins: {
					legend: { display: false },
					title: {
						display: false, // 제목 표시를 숨김 (커스텀 제목 사용)
						// text: title,
						// align: 'start',
						// font: { size: 30, weight: 'bold', family: 'omyu_pretty' },
						// padding: { top: 0, bottom: 5 }
					},
				},
				animation: { duration: 1200, easing: 'easeInOutBack' },
			};
		},
		async loadChartData() {
			try {
				const response = await axios.get(
					'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/monthlyScore.json',
				);

				if (response.status === 200 && response.data) {
					const dataKey = 'monthlyread';
					const data = [
						response.data[dataKey + 'jan'],
						response.data[dataKey + 'feb'],
						response.data[dataKey + 'mar'],
						response.data[dataKey + 'apr'],
						response.data[dataKey + 'may'],
					];

					const lastMonthIndex = data.length - 2;
					const change = data[data.length - 1] - data[lastMonthIndex];
					this.changeValue = change.toFixed(1);
					this.changeIcon = change >= 0 ? '↑' : '↓'; // 아이콘으로 화살표 사용

					this.chartData = {
						labels: ['1월', '2월', '3월', '4월', '5월'],
						datasets: [
							{
								type: 'line',
								data: data,
								backgroundColor: ctx => {
									const canvas = ctx.chart.ctx;
									const gradient = canvas.createLinearGradient(0, 0, 0, 160);
									gradient.addColorStop(0, 'rgb(75, 192, 192)');
									gradient.addColorStop(0.5, 'white');
									gradient.addColorStop(1, 'white');
									return gradient;
								},
								borderColor: 'rgb(75, 192, 192)',
								borderWidth: 2,
								tension: 0.4,
								fill: true,
							},
						],
					};
				} else {
					console.error('Data not loaded properly:', response);
				}
			} catch (error) {
				console.error('Data fetch error:', error);
				alert('차트 데이터를 로드하는 데 실패했습니다.');
			}
		},
	},
};
</script>

<style scoped></style>
