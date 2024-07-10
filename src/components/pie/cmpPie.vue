<template>
	<div class="container">
		<div class="grid grid-cols-1 p-2 m-4">
			<Dropdown
				v-model="selectedMonth"
				:options="formattedMonthlyData"
				optionLabel="label"
				optionValue="value"
				placeholder="Select a month"
				class="w-full"
			/>
		</div>

		<span v-if="selectedMonth" class="p-3 text-xl font-bold text-900">
			<span class="p-2 bg-white border-2 border-gray-200 rounded-md pi pi-chart-pie"></span>
			&nbsp; 점수별&nbsp; 인원&nbsp; 분포표
		</span>
		<div class="grid grid-cols-1">
			<Pie
				:data="selectedData"
				:options="pieChartOptions"
				v-if="selectedData && selectedMonth"
				:key="selectedMonth"
				class="p-2 chart-height"
			/>
		</div>

		<div class="grid grid-cols-1">
			<cmpSct v-if="selectedMonth" :selected-month="selectedMonth" class="p-2 m-4 bg-white" />
		</div>

		<div class="grid grid-cols-1 mt-4">
			<cmpTable v-if="selectedMonth" :selected-month="selectedMonth" />
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import { Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import cmpSct from '../scatter/cmpSct.vue';
import cmpTable from '../datatable/cmpTable.vue';

Chart.register(...registerables);

export default {
	name: 'cmpPie',
	components: {
		Dropdown,
		Pie,
		cmpSct,
		cmpTable,
	},
	setup() {
		const selectedMonth = ref('');
		const monthlyData = ref([
			{
				month: 'January',
				data: [0, 4, 9, 12, 19, 23, 19, 15, 5, 2],
			},
			{
				month: 'february',
				data: [2, 5, 21, 24, 28, 40, 16, 16, 2, 0],
			},
			{
				month: 'March',
				data: [0, 12, 61, 90, 84, 42, 29, 11, 1, 0],
			},
			{
				month: 'April',
				data: [0, 2, 21, 49, 51, 83, 52, 42, 20, 2],
			},
			{
				month: 'May',
				data: [0, 1, 17, 42, 73, 79, 50, 35, 32, 0],
			},
			{
				month: 'June',
				data: [0, 0, 11, 43, 71, 91, 62, 24, 6, 2],
			},

			// 추가 월별 데이터...
		]);

		const formattedMonthlyData = computed(() =>
			monthlyData.value.map(item => ({ label: item.month, value: item.month })),
		);

		const pieChartOptions = ref({
			responsive: true,
			maintainAspectRatio: false,
			devicePixelRatio: 2,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: false,
					text: '점수별 인원 분포',
				},
			},
			animation: {
				duration: 600,
				easing: 'easeIn',
			},
		});

		const selectedData = computed(() => {
			const data = monthlyData.value.find(d => d.month === selectedMonth.value);
			if (data) {
				return {
					labels: [
						'0-10',
						'11-20',
						'21-30',
						'31-40',
						'41-50',
						'51-60',
						'61-70',
						'71-80',
						'81-90',
						'91-100',
					],
					datasets: [
						{
							data: data.data,
							backgroundColor: [
								'rgb(255, 99, 132)',
								'rgb(255, 159, 64)',
								'rgb(255, 205, 86)',
								'rgb(75, 192, 192)',
								'rgb(54, 162, 235)',
								'rgb(63, 81, 181)',
								'rgb(153, 102, 255)',
								'rgb(255, 192, 203)',
								'rgb(165, 42, 42)',
								'rgb(201, 203, 207)',
							],
							hoverOffset: 4,
						},
					],
				};
			}
			return null;
		});

		return {
			selectedMonth,
			formattedMonthlyData,
			pieChartOptions,
			selectedData,
		};
	},
};
</script>

<style>
.chart-height {
	height: 36rem;
}
.border-style {
	border: 1px solid #f5f5f5;
}
</style>
