<template>
	<div>
		<DataTable
			v-if="filteredData.length > 0"
			:value="filteredData"
			:rowClass="rowClass"
			paginator
			:rows="20"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			dataKey="id"
			stripedRows
			selectionMode="single"
			responsiveLayout="scroll"
			scrollable
			scrollHeight="600px"
		>
			<Column field="stdName" header="이름" sortable style="min-width: 100px"></Column>

			<!-- NOTE -. This part shows the colour change for each Department. -->
			<Column field="dePart" header="분원" sortable style="min-width: 100px">
				<template #body="slotProps">
					<span :class="getDepotClass(slotProps.data.dePart)">{{ slotProps.data.dePart }}</span>
				</template>
			</Column>

			<Column field="branCh" header="계열" sortable style="min-width: 120px"></Column>
			<Column field="engScore" header="영어점수" sortable style="min-width: 120px"></Column>
			<Column field="mathScore" header="수학점수" sortable style="min-width: 120px"></Column>
			<template #footer>
				In total students are
				{{ filteredData ? filteredData.length : 0 }} students.</template
			>
		</DataTable>
		<p v-else>선택된 월에 해당하는 데이터가 없습니다.</p>
	</div>

	<!-- 테이블 디자인 해야됨. 크기조절!! -->
</template>

<script>
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
	name: 'MonthlyDataView',
	components: {
		DataTable,
		Column,
	},

	props: {
		selectedMonth: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			filteredData: [],
		};
	},

	created() {
		this.loadData();
	},

	watch: {
		selectedMonth: {
			immediate: true,
			handler() {
				this.loadData();
			},
		},
	},

	methods: {
		async loadData() {
			try {
				const response = await axios.get(
					'https://raw.githubusercontent.com/Pwang-je/scboard24/master/src/assets/json/tableData.json',
				);
				console.log('response', response); // 전체 응답을 확인합니다.
				// 'hasOwnProperty'를 안전하게 호출하기 위해 Object.prototype의 메서드를 직접 사용하지 않습니다.
				if (
					response.data &&
					Object.prototype.hasOwnProperty.call(response.data, this.selectedMonth)
				) {
					this.filteredData = response.data[this.selectedMonth];
					// 배열이 비어있지 않은지 추가로 확인합니다.
					if (!this.filteredData.length) {
						console.warn('Data for this month is empty:', this.selectedMonth);
					}
				} else {
					console.error('No data found for the month:', this.selectedMonth);
					this.filteredData = []; // 데이터가 없는 경우 안전하게 빈 배열로 설정합니다.
				}
				console.log('Filtered Data:', this.filteredData); // 필터된 데이터를 로그합니다.

				// IMPORTANT -. If MATH score is empty, treat as 'blank'.
				this.filteredData.forEach(item => {
					if (!item.mathScore) {
						item.mathScore = ''; // 수학 점수가 비어있으면 공백으로 처리합니다.
					}
				});
			} catch (error) {
				console.error('Error loading data:', error); // 오류가 발생한 경우 로그를 찍습니다.
			}
		},
		getDepotClass(dePart) {
			if (dePart === '강남') return 'depot-gangnam';
			if (dePart === '듀이카') return 'depot-duica';
			if (dePart === '노원') return 'depot-nowon';
			if (dePart === '일산') return 'depot-ilsan';
			return '';
		},
	},
};
</script>

<style>
.depot-gangnam {
	padding: 0.4rem;
	border-radius: 0.8rem;
	background-color: rgb(255, 99, 132);
	color: #ffffff;
}
.depot-duica {
	padding: 0.4rem;
	border-radius: 0.8rem;
	background-color: rgb(255, 205, 86);
	color: #ffffff;
}
.depot-nowon {
	padding: 0.4rem;
	border-radius: 0.8rem;
	background-color: rgb(6, 166, 108);
	color: #ffffff;
}
.depot-ilsan {
	padding: 0.4rem;
	border-radius: 0.8rem;
	background-color: rgb(54, 162, 235);
	color: #ffffff;
}
</style>
