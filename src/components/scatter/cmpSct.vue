<template>
	<span v-if="selectedMonth" class="p-3 text-xl font-bold text-900">
		<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-chart-scatter"></span>
		&nbsp; 자연계열&nbsp; 영어 + 수학&nbsp; 점수분포
	</span>

	<div v-if="chartData && chartData.datasets.length > 0" class="sct-size">
		<Scatter :data="chartData" :options="chartOptions" class="" />
	</div>

	<div v-else-if="selectedMonth && !chartData" class="no-data">
		선택된 달에 대한 데이터가 없어요.
	</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Scatter } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
	name: 'cmpSct',
	components: {
		Scatter,
	},
	props: {
		selectedMonth: {
			type: String,
			required: false,
		},
	},

	setup(props) {
		const monthlyData = [
			{
				month: 'March',
				data: [
					{
						location: '듀이카',
						points: [
							{ x: '60', y: '100' },
							{ x: '75', y: '100' },
							{ x: '67.5', y: '100' },
							{ x: '65', y: '96' },
							{ x: '35', y: '96' },
							{ x: '57.5', y: '88' },
							{ x: '62.5', y: '84' },
							{ x: '42.5', y: '84' },
							{ x: '47.5', y: '80' },
							{ x: '32.5', y: '76' },
							{ x: '47.5', y: '64' },
							{ x: '45', y: '64' },
							{ x: '35', y: '56' },
							{ x: '30', y: '52' },
							{ x: '37.5', y: '48' },
							{ x: '37.5', y: '44' },
							{ x: '45', y: '44' },
							{ x: '30', y: '32' },
							{ x: '30', y: '32' },
							{ x: '22.5', y: '28' },
							{ x: '32.5', y: '28' },
							{ x: '27.5', y: '24' },
							{ x: '62.5', y: '24' },
							{ x: '32.5', y: '16' },
							{ x: '32.5', y: '16' },
							{ x: '37.5', y: '16' },
							{ x: '30', y: '8' },
						],
					},
					{
						location: '강남',
						points: [
							{ x: '27.5', y: '100' },
							{ x: '40', y: '100' },
							{ x: '42.5', y: '96' },
							{ x: '62.5', y: '96' },
							{ x: '65', y: '96' },
							{ x: '52.5', y: '96' },
							{ x: '62.5', y: '92' },
							{ x: '47.5', y: '92' },
							{ x: '72.5', y: '92' },
							{ x: '47.5', y: '92' },
							{ x: '50', y: '88' },
							{ x: '60', y: '88' },
							{ x: '47.5', y: '88' },
							{ x: '37.5', y: '88' },
							{ x: '22.5', y: '88' },
							{ x: '35', y: '88' },
							{ x: '40', y: '88' },
							{ x: '45', y: '84' },
							{ x: '27.5', y: '84' },
							{ x: '35', y: '84' },
							{ x: '42.5', y: '84' },
							{ x: '80', y: '84' },
							{ x: '65', y: '80' },
							{ x: '35', y: '80' },
							{ x: '25', y: '80' },
							{ x: '45', y: '80' },
							{ x: '37.5', y: '80' },
							{ x: '45', y: '76' },
							{ x: '67.5', y: '76' },
							{ x: '52.5', y: '76' },
							{ x: '55', y: '76' },
							{ x: '40', y: '72' },
							{ x: '45', y: '64' },
							{ x: '35', y: '64' },
							{ x: '30', y: '64' },
							{ x: '20', y: '64' },
							{ x: '27.5', y: '60' },
							{ x: '60', y: '60' },
							{ x: '32.5', y: '60' },
							{ x: '35', y: '56' },
							{ x: '30', y: '56' },
							{ x: '25', y: '52' },
							{ x: '62.5', y: '52' },
							{ x: '32.5', y: '52' },
							{ x: '47.5', y: '48' },
							{ x: '42.5', y: '36' },
							{ x: '50', y: '36' },
							{ x: '50', y: '36' },
							{ x: '50', y: '36' },
							{ x: '27.5', y: '28' },
							{ x: '30', y: '20' },
							{ x: '40', y: '16' },
							{ x: '42.5', y: '12' },
						],
					},
					{
						location: '일산',
						points: [
							{ x: '42.5', y: '96' },
							{ x: '62.5', y: '96' },
							{ x: '25', y: '96' },
							{ x: '65', y: '96' },
							{ x: '57.5', y: '92' },
							{ x: '55', y: '92' },
							{ x: '57.5', y: '88' },
							{ x: '42.5', y: '88' },
							{ x: '35', y: '88' },
							{ x: '47.5', y: '88' },
							{ x: '60', y: '88' },
							{ x: '52.5', y: '80' },
							{ x: '35', y: '80' },
							{ x: '50', y: '80' },
							{ x: '47.5', y: '76' },
							{ x: '35', y: '76' },
							{ x: '40', y: '76' },
							{ x: '80', y: '76' },
							{ x: '40', y: '68' },
							{ x: '47.5', y: '68' },
							{ x: '32.5', y: '60' },
							{ x: '57.5', y: '60' },
							{ x: '42.5', y: '56' },
							{ x: '55', y: '56' },
							{ x: '45', y: '52' },
						],
					},
					{
						location: '노원',
						points: [
							{ x: '60', y: '100' },
							{ x: '27.5', y: '96' },
							{ x: '47.5', y: '92' },
							{ x: '45', y: '92' },
							{ x: '67.5', y: '92' },
							{ x: '50', y: '92' },
							{ x: '32.5', y: '88' },
							{ x: '52.5', y: '84' },
							{ x: '72.5', y: '84' },
							{ x: '27.5', y: '84' },
							{ x: '57.5', y: '84' },
							{ x: '40', y: '80' },
							{ x: '55', y: '80' },
							{ x: '32.5', y: '72' },
							{ x: '47.5', y: '68' },
							{ x: '30', y: '68' },
							{ x: '62.5', y: '68' },
							{ x: '42.5', y: '64' },
							{ x: '32.5', y: '52' },
							{ x: '55', y: '48' },
							{ x: '37.5', y: '44' },
							{ x: '30', y: '44' },
							{ x: '32.5', y: '36' },
							{ x: '42.5', y: '32' },
							{ x: '42.5', y: '16' },
						],
					},
				],
			},
			{
				month: 'April',
				data: [
					{
						location: '듀이카',
						points: [
							{ x: '67.5', y: '100' },
							{ x: '85', y: '100' },
							{ x: '67.5', y: '96' },
							{ x: '55', y: '96' },
							{ x: '60', y: '96' },
							{ x: '80', y: '84' },
							{ x: '78', y: '80' },
							{ x: '50', y: '76' },
							{ x: '70', y: '72' },
							{ x: '60', y: '68' },
							{ x: '65', y: '64' },
							{ x: '45', y: '56' },
							{ x: '57.5', y: '56' },
							{ x: '40', y: '48' },
							{ x: '70', y: '48' },
							{ x: '35', y: '44' },
							{ x: '57.5', y: '44' },
							{ x: '60', y: '44' },
							{ x: '25', y: '40' },
							{ x: '30', y: '36' },
							{ x: '25', y: '32' },
							{ x: '65', y: '32' },
							{ x: '55', y: '32' },
							{ x: '75', y: '32' },
							{ x: '52.5', y: '28' },
							{ x: '57.5', y: '28' },
							{ x: '37.5', y: '24' },
							{ x: '77.5', y: '12' },
						],
					},
					{
						location: '강남',
						points: [
							{ x: '80', y: '100' },
							{ x: '50', y: '100' },
							{ x: '90', y: '100' },
							{ x: '40', y: '96' },
							{ x: '57.5', y: '92' },
							{ x: '80', y: '92' },
							{ x: '75', y: '88' },
							{ x: '82.5', y: '88' },
							{ x: '82.5', y: '88' },
							{ x: '60', y: '88' },
							{ x: '55', y: '84' },
							{ x: '47.5', y: '84' },
							{ x: '50', y: '84' },
							{ x: '80', y: '84' },
							{ x: '35', y: '84' },
							{ x: '57.5', y: '80' },
							{ x: '67.5', y: '80' },
							{ x: '85', y: '80' },
							{ x: '62.5', y: '80' },
							{ x: '52.5', y: '80' },
							{ x: '70', y: '80' },
							{ x: '72.5', y: '76' },
							{ x: '75', y: '76' },
							{ x: '60', y: '72' },
							{ x: '52.5', y: '72' },
							{ x: '52.5', y: '68' },
							{ x: '72.5', y: '68' },
							{ x: '62.5', y: '64' },
							{ x: '55', y: '64' },
							{ x: '40', y: '64' },
							{ x: '75', y: '64' },
							{ x: '52.5', y: '64' },
							{ x: '67.5', y: '64' },
							{ x: '40', y: '60' },
							{ x: '30', y: '60' },
							{ x: '47.5', y: '56' },
							{ x: '47.5', y: '52' },
							{ x: '50', y: '52' },
							{ x: '70', y: '48' },
							{ x: '37.5', y: '44' },
							{ x: '52.5', y: '40' },
							{ x: '37.5', y: '40' },
							{ x: '72.5', y: '32' },
							{ x: '62.5', y: '32' },
							{ x: '57.5', y: '32' },
							{ x: '55', y: '28' },
							{ x: '25', y: '28' },
							{ x: '60', y: '28' },
							{ x: '27.5', y: '28' },
							{ x: '35', y: '28' },
							{ x: '45', y: '24' },
							{ x: '37.5', y: '20' },
						],
					},
					{
						location: '일산',
						points: [
							{ x: '67.5', y: '100' },
							{ x: '52.5', y: '92' },
							{ x: '57.5', y: '88' },
							{ x: '67.5', y: '88' },
							{ x: '67.5', y: '88' },
							{ x: '67.5', y: '88' },
							{ x: '57.5', y: '88' },
							{ x: '55', y: '84' },
							{ x: '60', y: '84' },
							{ x: '50', y: '80' },
							{ x: '50', y: '80' },
							{ x: '32.5', y: '76' },
							{ x: '47.5', y: '76' },
							{ x: '57.5', y: '72' },
							{ x: '45', y: '72' },
							{ x: '77.5', y: '72' },
							{ x: '52.5', y: '72' },
							{ x: '65', y: '64' },
							{ x: '67.5', y: '60' },
							{ x: '57.5', y: '56' },
							{ x: '52.5', y: '52' },
							{ x: '35', y: '40' },
							{ x: '47.5', y: '36' },
							{ x: '25', y: '32' },
							{ x: '95', y: '32' },
							{ x: '47.5', y: '32' },
							{ x: '57.5', y: '20' },
						],
					},
					{
						location: '노원',
						points: [
							{ x: '60', y: '96' },
							{ x: '67.5', y: '92' },
							{ x: '77.5', y: '88' },
							{ x: '70', y: '80' },
							{ x: '40', y: '76' },
							{ x: '85', y: '76' },
							{ x: '72.5', y: '76' },
							{ x: '67.5', y: '76' },
							{ x: '40', y: '76' },
							{ x: '30', y: '72' },
							{ x: '30', y: '68' },
							{ x: '52.5', y: '68' },
							{ x: '60', y: '64' },
							{ x: '25', y: '60' },
							{ x: '72.5', y: '52' },
							{ x: '65', y: '52' },
							{ x: '35', y: '44' },
							{ x: '55', y: '44' },
							{ x: '60', y: '44' },
							{ x: '82.5', y: '40' },
							{ x: '50', y: '40' },
							{ x: '30', y: '40' },
							{ x: '47.5', y: '36' },
							{ x: '57.5', y: '32' },
							{ x: '45', y: '32' },
							{ x: '70', y: '32' },
							{ x: '50', y: '28' },
							{ x: '27.5', y: '28' },
							{ x: '45', y: '20' },
						],
					},
				],
			},
			{
				month: 'May',
				data: [
					{
						location: '듀이카',
						points: [
							{ x: '70', y: '96' },
							{ x: '80', y: '96' },
							{ x: '55', y: '88' },
							{ x: '50', y: '80' },
							{ x: '57.5', y: '72' },
							{ x: '87.5', y: '72' },
							{ x: '57.5', y: '72' },
							{ x: '62.5', y: '72' },
							{ x: '52.5', y: '68' },
							{ x: '62.5', y: '68' },
							{ x: '65', y: '60' },
							{ x: '55', y: '60' },
							{ x: '70', y: '52' },
							{ x: '32.5', y: '52' },
							{ x: '42.5', y: '40' },
							{ x: '52.5', y: '40' },
							{ x: '30', y: '36' },
							{ x: '25', y: '36' },
							{ x: '70', y: '36' },
							{ x: '27.5', y: '28' },
							{ x: '37.5', y: '28' },
							{ x: '45', y: '24' },
							{ x: '50', y: '24' },
							{ x: '62.5', y: '24' },
							{ x: '27.5', y: '20' },
							{ x: '80', y: '16' },
						],
					},
					{
						location: '강남',
						points: [
							{ x: '40', y: '100' },
							{ x: '80', y: '96' },
							{ x: '60', y: '92' },
							{ x: '55', y: '88' },
							{ x: '82.5', y: '88' },
							{ x: '67.5', y: '88' },
							{ x: '77.5', y: '84' },
							{ x: '77.5', y: '84' },
							{ x: '85', y: '84' },
							{ x: '82.5', y: '84' },
							{ x: '45', y: '84' },
							{ x: '85', y: '80' },
							{ x: '80', y: '76' },
							{ x: '37.5', y: '72' },
							{ x: '57.5', y: '72' },
							{ x: '67.5', y: '72' },
							{ x: '55', y: '68' },
							{ x: '50', y: '68' },
							{ x: '32.5', y: '68' },
							{ x: '52.5', y: '68' },
							{ x: '47.5', y: '64' },
							{ x: '40', y: '64' },
							{ x: '70', y: '64' },
							{ x: '60', y: '60' },
							{ x: '32.5', y: '60' },
							{ x: '47.5', y: '60' },
							{ x: '72.5', y: '60' },
							{ x: '72.5', y: '56' },
							{ x: '60', y: '52' },
							{ x: '50', y: '52' },
							{ x: '55', y: '48' },
							{ x: '62.5', y: '48' },
							{ x: '60', y: '48' },
							{ x: '37.5', y: '44' },
							{ x: '55', y: '44' },
							{ x: '47.5', y: '44' },
							{ x: '35', y: '40' },
							{ x: '35', y: '40' },
							{ x: '65', y: '40' },
							{ x: '32.5', y: '40' },
							{ x: '25', y: '36' },
							{ x: '70', y: '36' },
							{ x: '70', y: '36' },
							{ x: '30', y: '28' },
							{ x: '52.5', y: '24' },
							{ x: '60', y: '20' },
							{ x: '40', y: '12' },
						],
					},
					{
						location: '일산',
						points: [
							{ x: '62.5', y: '92' },
							{ x: '60', y: '88' },
							{ x: '42.5', y: '84' },
							{ x: '52.5', y: '80' },
							{ x: '52.5', y: '80' },
							{ x: '57.5', y: '80' },
							{ x: '55', y: '80' },
							{ x: '67.5', y: '80' },
							{ x: '47.5', y: '76' },
							{ x: '50', y: '76' },
							{ x: '60', y: '76' },
							{ x: '45', y: '72' },
							{ x: '65', y: '72' },
							{ x: '62.5', y: '68' },
							{ x: '62.5', y: '60' },
							{ x: '55', y: '60' },
							{ x: '45', y: '56' },
							{ x: '55', y: '52' },
							{ x: '82.5', y: '48' },
							{ x: '47.5', y: '48' },
							{ x: '40', y: '48' },
							{ x: '57.5', y: '40' },
							{ x: '45', y: '32' },
							{ x: '42.5', y: '28' },
							{ x: '50', y: '24' },
							{ x: '42.5', y: '20' },
						],
					},
					{
						location: '노원',
						points: [
							{ x: '65', y: '88' },
							{ x: '57.5', y: '84' },
							{ x: '70', y: '72' },
							{ x: '60', y: '68' },
							{ x: '82.5', y: '68' },
							{ x: '30', y: '68' },
							{ x: '57.5', y: '64' },
							{ x: '55', y: '64' },
							{ x: '77.5', y: '60' },
							{ x: '72.5', y: '60' },
							{ x: '50', y: '56' },
							{ x: '67.5', y: '56' },
							{ x: '70', y: '52' },
							{ x: '57.5', y: '52' },
							{ x: '60', y: '48' },
							{ x: '42.5', y: '48' },
							{ x: '62.5', y: '48' },
							{ x: '40', y: '44' },
							{ x: '55', y: '44' },
							{ x: '42.5', y: '44' },
							{ x: '35', y: '44' },
							{ x: '52.5', y: '36' },
							{ x: '45', y: '36' },
							{ x: '52.5', y: '36' },
							{ x: '42.5', y: '32' },
							{ x: '27.5', y: '28' },
							{ x: '45', y: '28' },
							{ x: '42.5', y: '24' },
							{ x: '45', y: '16' },
						],
					},
				],
			},
			{
				month: 'June',
				data: [
					{
						location: '듀이카',
						points: [
							{
								x: 55,
								y: 88,
							},
							{
								x: 65,
								y: 84,
							},
							{
								x: 52.5,
								y: 72,
							},
							{
								x: 32.5,
								y: 72,
							},
							{
								x: 52.5,
								y: 60,
							},
							{
								x: 55,
								y: 60,
							},
							{
								x: 60,
								y: 56,
							},
							{
								x: 70,
								y: 56,
							},
							{
								x: 40,
								y: 56,
							},
							{
								x: 50,
								y: 52,
							},
							{
								x: 40,
								y: 48,
							},
							{
								x: 45,
								y: 44,
							},
							{
								x: 42.5,
								y: 36,
							},
							{
								x: 55,
								y: 36,
							},
							{
								x: 27.5,
								y: 32,
							},
							{
								x: 52.5,
								y: 32,
							},
							{
								x: 47.5,
								y: 24,
							},
							{
								x: 40,
								y: 24,
							},
							{
								x: 35,
								y: 12,
							},
						],
					},
					{
						location: '강남',
						points: [
							{
								x: 57.5,
								y: 96,
							},
							{
								x: 70,
								y: 88,
							},
							{
								x: 70,
								y: 84,
							},
							{
								x: 60,
								y: 84,
							},
							{
								x: 72.5,
								y: 84,
							},
							{
								x: 62.5,
								y: 80,
							},
							{
								x: 65,
								y: 80,
							},
							{
								x: 77.5,
								y: 76,
							},
							{
								x: 67.5,
								y: 72,
							},
							{
								x: 57.5,
								y: 72,
							},
							{
								x: 57.5,
								y: 72,
							},
							{
								x: 52.5,
								y: 72,
							},
							{
								x: 55,
								y: 68,
							},
							{
								x: 52.5,
								y: 68,
							},
							{
								x: 60,
								y: 68,
							},
							{
								x: 52.5,
								y: 64,
							},
							{
								x: 60,
								y: 64,
							},
							{
								x: 47.5,
								y: 64,
							},
							{
								x: 37.5,
								y: 64,
							},
						],
					},
					{
						location: '일산',
						points: [
							{
								x: 55,
								y: 100,
							},
							{
								x: 60,
								y: 88,
							},
							{
								x: 95,
								y: 88,
							},
							{
								x: 55,
								y: 84,
							},
							{
								x: 65,
								y: 84,
							},
							{
								x: 67.5,
								y: 76,
							},
							{
								x: 42.5,
								y: 72,
							},
							{
								x: 60,
								y: 72,
							},
							{
								x: 45,
								y: 68,
							},
							{
								x: 55,
								y: 68,
							},
							{
								x: 45,
								y: 64,
							},
							{
								x: 55,
								y: 64,
							},
							{
								x: 45,
								y: 64,
							},
							{
								x: 50,
								y: 64,
							},
							{
								x: 57.5,
								y: 60,
							},
							{
								x: 70,
								y: 60,
							},
							{
								x: 47.5,
								y: 56,
							},
							{
								x: 52.5,
								y: 52,
							},
							{
								x: 45,
								y: 52,
							},
						],
					},
					{
						location: '노원',
						points: [
							{
								x: 87.5,
								y: 92,
							},
							{
								x: 55,
								y: 88,
							},
							{
								x: 57.5,
								y: 84,
							},
							{
								x: 52.5,
								y: 84,
							},
							{
								x: 67.5,
								y: 80,
							},
							{
								x: 60,
								y: 76,
							},
							{
								x: 65,
								y: 76,
							},
							{
								x: 40,
								y: 76,
							},
							{
								x: 45,
								y: 72,
							},
							{
								x: 72.5,
								y: 68,
							},
							{
								x: 32.5,
								y: 68,
							},
							{
								x: 62.5,
								y: 68,
							},
							{
								x: 60,
								y: 64,
							},
							{
								x: 62.5,
								y: 64,
							},
							{
								x: 47.5,
								y: 60,
							},
							{
								x: 72.5,
								y: 60,
							},
							{
								x: 50,
								y: 60,
							},
							{
								x: 47.5,
								y: 56,
							},
							{
								x: 67.5,
								y: 52,
							},
						],
					},
				],
			},
			{
				month: 'July',
				data: [
					{
						location: '듀이카',
						points: [
							{
								x: '30',
								y: '12',
							},
							{
								x: '40',
								y: '32',
							},
							{
								x: '60',
								y: '64',
							},
							{
								x: '57.5',
								y: '60',
							},
							{
								x: '70',
								y: '24',
							},
							{
								x: '67.5',
								y: '96',
							},
							{
								x: '57.5',
								y: '68',
							},
							{
								x: '65',
								y: '60',
							},
							{
								x: '35',
								y: '36',
							},
							{
								x: '42.5',
								y: '28',
							},
							{
								x: '70',
								y: '88',
							},
						],
					},
					{
						location: '강남',
						points: [
							{
								x: '67.5',
								y: '92',
							},
							{
								x: '67.5',
								y: '88',
							},
							{
								x: '55',
								y: '88',
							},
							{
								x: '65',
								y: '88',
							},
							{
								x: '65',
								y: '76',
							},
							{
								x: '72.5',
								y: '76',
							},
							{
								x: '55',
								y: '76',
							},
							{
								x: '50',
								y: '72',
							},
							{
								x: '40',
								y: '72',
							},
							{
								x: '75',
								y: '64',
							},
							{
								x: '65',
								y: '64',
							},
							{
								x: '65',
								y: '64',
							},
							{
								x: '67.5',
								y: '64',
							},
							{
								x: '42.5',
								y: '60',
							},
							{
								x: '40',
								y: '56',
							},
							{
								x: '42.5',
								y: '56',
							},
							{
								x: '35',
								y: '56',
							},
							{
								x: '40',
								y: '56',
							},
							{
								x: '50',
								y: '52',
							},
							{
								x: '32.5',
								y: '48',
							},
							{
								x: '47.5',
								y: '48',
							},
							{
								x: '52.5',
								y: '48',
							},
							{
								x: '45',
								y: '44',
							},
							{
								x: '50',
								y: '44',
							},
							{
								x: '60',
								y: '40',
							},
							{
								x: '30',
								y: '40',
							},
							{
								x: '47.5',
								y: '40',
							},
							{
								x: '47.5',
								y: '40',
							},
							{
								x: '27.5',
								y: '40',
							},
							{
								x: '37.5',
								y: '36',
							},
							{
								x: '50',
								y: '36',
							},
							{
								x: '57.5',
								y: '32',
							},
							{
								x: '52.5',
								y: '32',
							},
							{
								x: '72.5',
								y: '28',
							},
							{
								x: '55',
								y: '28',
							},
							{
								x: '42.5',
								y: '28',
							},
							{
								x: '30',
								y: '24',
							},
							{
								x: '52.5',
								y: '20',
							},
							{
								x: '65',
								y: '16',
							},
						],
					},
					{
						location: '일산',
						points: [
							{
								x: '65',
								y: '96',
							},
							{
								x: '77.5',
								y: '88',
							},
							{
								x: '57.5',
								y: '80',
							},
							{
								x: '62.5',
								y: '76',
							},
							{
								x: '47.5',
								y: '72',
							},
							{
								x: '52.5',
								y: '68',
							},
							{
								x: '50',
								y: '68',
							},
							{
								x: '35',
								y: '68',
							},
							{
								x: '55',
								y: '68',
							},
							{
								x: '35',
								y: '64',
							},
							{
								x: '65',
								y: '64',
							},
							{
								x: '42.5',
								y: '64',
							},
							{
								x: '62.5',
								y: '64',
							},
							{
								x: '45',
								y: '60',
							},
							{
								x: '57.5',
								y: '60',
							},
							{
								x: '47.5',
								y: '56',
							},
							{
								x: '60',
								y: '52',
							},
							{
								x: '62.5',
								y: '48',
							},
							{
								x: '45',
								y: '44',
							},
							{
								x: '52.5',
								y: '44',
							},
							{
								x: '30',
								y: '40',
							},
							{
								x: '42.5',
								y: '36',
							},
							{
								x: '30',
								y: '32',
							},
							{
								x: '50',
								y: '24',
							},
							{
								x: '45',
								y: '20',
							},
							{
								x: '30',
								y: '20',
							},
							{
								x: '35',
								y: '16',
							},
							{
								x: '37.5',
								y: '16',
							},
							{
								x: '52.5',
								y: '16',
							},
						],
					},
					{
						location: '노원',
						points: [
							{
								x: '62.5',
								y: '84',
							},
							{
								x: '62.5',
								y: '84',
							},
							{
								x: '35',
								y: '84',
							},
							{
								x: '37.5',
								y: '80',
							},
							{
								x: '65',
								y: '80',
							},
							{
								x: '57.5',
								y: '80',
							},
							{
								x: '57.5',
								y: '76',
							},
							{
								x: '50',
								y: '72',
							},
							{
								x: '40',
								y: '72',
							},
							{
								x: '72.5',
								y: '68',
							},
							{
								x: '47.5',
								y: '68',
							},
							{
								x: '75',
								y: '64',
							},
							{
								x: '77.5',
								y: '64',
							},
							{
								x: '55',
								y: '64',
							},
							{
								x: '52.5',
								y: '52',
							},
							{
								x: '47.5',
								y: '52',
							},
							{
								x: '47.5',
								y: '48',
							},
							{
								x: '62.5',
								y: '48',
							},
							{
								x: '37.5',
								y: '48',
							},
							{
								x: '60',
								y: '44',
							},
							{
								x: '45',
								y: '44',
							},
							{
								x: '85',
								y: '44',
							},
							{
								x: '62.5',
								y: '44',
							},
							{
								x: '55',
								y: '44',
							},
							{
								x: '32.5',
								y: '44',
							},
							{
								x: '40',
								y: '40',
							},
							{
								x: '32.5',
								y: '40',
							},
							{
								x: '30',
								y: '40',
							},
							{
								x: '47.5',
								y: '32',
							},
							{
								x: '42.5',
								y: '32',
							},
							{
								x: '42.5',
								y: '32',
							},
							{
								x: '75',
								y: '28',
							},
							{
								x: '37.5',
								y: '24',
							},
							{
								x: '35',
								y: '12',
							},
						],
					},
				],
			},
			{
				month: 'August',
				data: [
					{
						location: '듀이카',
						points: [
							{
								x: 77.5,
								y: 96,
							},
							{
								x: 77.5,
								y: 76,
							},
							{
								x: 77.5,
								y: 64,
							},
							{
								x: 52.5,
								y: 60,
							},
							{
								x: 70,
								y: 60,
							},
							{
								x: 60,
								y: 56,
							},
							{
								x: 50,
								y: 56,
							},
							{
								x: 62.5,
								y: 48,
							},
							{
								x: 92.5,
								y: 48,
							},
							{
								x: 25,
								y: 8,
							},
						],
					},
					{
						location: '강남',
						points: [
							{
								x: 72.5,
								y: 96,
							},
							{
								x: 80,
								y: 84,
							},
							{
								x: 50,
								y: 80,
							},
							{
								x: 75,
								y: 76,
							},
							{
								x: 75,
								y: 76,
							},
							{
								x: 57.5,
								y: 76,
							},
							{
								x: 52.5,
								y: 72,
							},
							{
								x: 45,
								y: 72,
							},
							{
								x: 72.5,
								y: 72,
							},
							{
								x: 45,
								y: 72,
							},
							{
								x: 75,
								y: 64,
							},
							{
								x: 70,
								y: 64,
							},
							{
								x: 67.5,
								y: 60,
							},
							{
								x: 67.5,
								y: 60,
							},
							{
								x: 57.5,
								y: 60,
							},
							{
								x: 42.5,
								y: 60,
							},
							{
								x: 60,
								y: 60,
							},
							{
								x: 50,
								y: 56,
							},
							{
								x: 80,
								y: 52,
							},
							{
								x: 57.5,
								y: 52,
							},
							{
								x: 70,
								y: 52,
							},
							{
								x: 82.5,
								y: 52,
							},
							{
								x: 70,
								y: 52,
							},
							{
								x: 70,
								y: 52,
							},
							{
								x: 57.5,
								y: 44,
							},
							{
								x: 52.5,
								y: 40,
							},
							{
								x: 67.5,
								y: 36,
							},
							{
								x: 40,
								y: 36,
							},
							{
								x: 80,
								y: 32,
							},
							{
								x: 57.5,
								y: 28,
							},
							{
								x: 60,
								y: 28,
							},
							{
								x: 42.5,
								y: 24,
							},
						],
					},
					{
						location: '일산',
						points: [
							{
								x: 65,
								y: 92,
							},
							{
								x: 77.5,
								y: 84,
							},
							{
								x: 60,
								y: 84,
							},
							{
								x: 70,
								y: 84,
							},
							{
								x: 80,
								y: 80,
							},
							{
								x: 65,
								y: 80,
							},
							{
								x: 70,
								y: 80,
							},
							{
								x: 60,
								y: 76,
							},
							{
								x: 75,
								y: 76,
							},
							{
								x: 67.5,
								y: 72,
							},
							{
								x: 67.5,
								y: 68,
							},
							{
								x: 62.5,
								y: 64,
							},
							{
								x: 70,
								y: 64,
							},
							{
								x: 57.5,
								y: 64,
							},
							{
								x: 62.5,
								y: 60,
							},
							{
								x: 72.5,
								y: 56,
							},
							{
								x: 72.5,
								y: 56,
							},
							{
								x: 45,
								y: 56,
							},
							{
								x: 50,
								y: 52,
							},
							{
								x: 75,
								y: 44,
							},
							{
								x: 57.5,
								y: 40,
							},
							{
								x: 30,
								y: 28,
							},
							{
								x: 75,
								y: 28,
							},
							{
								x: 52.5,
								y: 24,
							},
							{
								x: 52.5,
								y: 20,
							},
							{
								x: 35,
								y: 20,
							},
							{
								x: 62.5,
								y: 16,
							},
						],
					},
					{
						location: '노원',
						points: [
							{
								x: 67.5,
								y: 84,
							},
							{
								x: 47.5,
								y: 84,
							},
							{
								x: 80,
								y: 84,
							},
							{
								x: 92.5,
								y: 84,
							},
							{
								x: 50,
								y: 80,
							},
							{
								x: 65,
								y: 68,
							},
							{
								x: 77.5,
								y: 64,
							},
							{
								x: 75,
								y: 64,
							},
							{
								x: 72.5,
								y: 64,
							},
							{
								x: 57.5,
								y: 64,
							},
							{
								x: 80,
								y: 64,
							},
							{
								x: 45,
								y: 64,
							},
							{
								x: 52.5,
								y: 60,
							},
							{
								x: 80,
								y: 60,
							},
							{
								x: 45,
								y: 60,
							},
							{
								x: 75,
								y: 60,
							},
							{
								x: 42.5,
								y: 56,
							},
							{
								x: 45,
								y: 56,
							},
							{
								x: 90,
								y: 56,
							},
							{
								x: 77.5,
								y: 56,
							},
							{
								x: 67.5,
								y: 52,
							},
							{
								x: 77.5,
								y: 52,
							},
							{
								x: 60,
								y: 44,
							},
							{
								x: 62.5,
								y: 44,
							},
							{
								x: 65,
								y: 40,
							},
							{
								x: 40,
								y: 40,
							},
							{
								x: 57.5,
								y: 40,
							},
							{
								x: 37.5,
								y: 36,
							},
							{
								x: 52.5,
								y: 36,
							},
							{
								x: 60,
								y: 36,
							},
							{
								x: 47.5,
								y: 36,
							},
							{
								x: 70,
								y: 28,
							},
							{
								x: 62.5,
								y: 28,
							},
							{
								x: 45,
								y: 24,
							},
							{
								x: 35,
								y: 24,
							},
						],
					},
				],
			},
		];

		const chartData = ref(null);
		const chartOptions = {
			scales: {
				x: {
					title: {
						display: true,
						text: 'Eng',
					},
				},
				y: {
					title: {
						display: true,
						text: 'Math',
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
			devicePixelRatio: 2,
			plugins: {
				// datalabels: {
				// 	display: false,
				// },
				legend: {
					position: 'top',
				},
				title: {
					display: false,
					text: '자연계열 영어 수학 점수분포',
				},
			},
			animation: {
				duration: 1200,
				easing: 'easeInOutExpo',
			},
		};

		const findDataForMonth = month => {
			return monthlyData.find(data => data.month === month) || null;
		};

		const updateChartData = data => {
			if (data) {
				chartData.value = {
					datasets: generateChartData(data.data),
				};
			} else {
				chartData.value = null; // 데이터가 없으면 null 설정
			}
		};

		const generateChartData = selectedData => {
			const datasets = [];

			const colors = {
				듀이카: 'rgb(255, 205, 86)',
				강남: 'rgb(255, 99, 132)',
				노원: 'rgb(6,166,108)',
				일산: 'rgb(54, 162, 235)',
			};

			selectedData.forEach(item => {
				const dataset = {
					label: item.location,
					data: item.points.map(point => ({ x: point.x, y: point.y })),
					pointRadius: 4,
					backgroundColor: colors[item.location],
				};
				datasets.push(dataset);
			});
			return datasets;
		};

		onMounted(() => {
			const data = findDataForMonth(props.selectedMonth);
			updateChartData(data);
		});

		watch(
			() => props.selectedMonth,
			newMonth => {
				const data = findDataForMonth(newMonth);
				updateChartData(data);
			},
		);

		return { chartData, chartOptions };
	},
};
</script>
<style>
.sct-size {
	height: 28rem;
}
.no-data {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28.75rem; /* 메시지가 원래 차트 자리를 차지하도록 같은 높이 설정 */
	font-size: 1.2rem;
	color: #666;
}
</style>
