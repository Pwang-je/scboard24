<template>
    <div>
        <Scatter 
            v-if="chartData"
            :data="chartData"
            :options="chartOptions"
        />
    </div>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { Scatter } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    name: "cmpScat",
    components: {
        Scatter,
    },
    props: {
        selectedMonth: {
            type: String,
            required: true,
        },
    },

    setup(props) {
    const monthlyData = [
        {
            mont: "January",
            data: [
                {
                    location: "Duica",
                    points: [
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                    ],
                },
                {
                    location: "Gangnam",
                    points: [
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                    ]
                },
                {
                    location: "Ilsan",
                    points: [
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                    ],
                },
                {
                    location: "Nowon",
                    points: [
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                        {x: "", y: ""},
                    ]
                },
            ]
        },

    ];

        const chartData = ref(null);
        const chartOptions = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Eng",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Math",
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 2,
            plugins: {
                datalabels: {
                    display: false,
                },
                legeld: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "자연계열 영어 수학 점수분포",
                },
            },
        };

        const generateChartData = (selectedData) => {
            const datasets = [];

            const colors = {
                Duica: "rgb(255, 205, 86)",
                Gangnam: "rgb(255, 99, 132)",
                Nowon: "rgb(6,166,108)",
                Ilsan: "rgb(54, 162, 235)",
            };

            selectedData.forEach((item) => {
                const dataset = {
                    label: item.location,
                    data: item.points.map((point) => ({x: point.x, y: point.y})),
                    pointRadius: 5,
                    backgroundColor: colors[item.location],
                };
                datasets.push(dataset);
            });
            return datasets;
        };

        onMounted(() => {
            const selectedData = monthlyData.find(
                (data) => data.month === props.selectedMonth
            );

            console.log("scatter selected data(onMounted): ", selectedData);
            console.log(
                "scatter selected props.selectedMonth data(onMounted): ",
                props.selectedMonth
            );

            if (selectedData) {
                chartData.value = {
                datasets: generateChartData(selectedData.data),
                };
            }
        });

        watch(
            () => props.selectedMonth,
            (newMonth) => {
                const selectedData = monthlyData.find((data) => data.month === newMonth);

                console.log("scatter selected data(watch): ", selectedData);
                console.log(
                "scatter selected props.selectedMonth data(watch): ",
                props.selectedMonth
                );

                if (selectedData) {
                    chartData.value = {
                        datasets: generateChartData(selectedData.data),
                    };
                }
            }
        );

        return { chartData, chartOptions };

    },

};
</script>
<style>
    
</style>