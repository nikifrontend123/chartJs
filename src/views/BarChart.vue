<template>
    <div>
      <canvas ref="myChart" height="400"></canvas>
    </div>
    <h1>Test Api</h1>
    <div v-for="(data, index) in chartData" :key="index">
      {{ data }}
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        myChart: null,
      };
    },
    computed: {
      chartData() {
        return this.$store.getters.getChartData;
      },
      datas() {
        return this.$store.getters.getDatas;
      },
    },
    methods: {
      createChart() {
        const ctx = this.$refs.myChart.getContext('2d');
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: this.chartData,
          options: {
            // responsive: true,
            maintainAspectRatio: false,
          },
        });
      },
    },
    mounted() {
      this.$store.dispatch('fetchData');
      this.createChart(); // Call the custom method to create the chart
    },
  };
  </script>
  