<template>
  <div style="max-height: 80vh;">
    <div>
      <label for="chartType">Select Chart Type:</label>
      <select id="chartType" v-model="selectedChartType" @change="updateChartType">
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="doughnut">Doughnut Chart</option>
        <option value="polarArea">Polar Area Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      chartData: null,
      selectedChartType: 'bar', // Default chart type is bar
      chartInstance: null, // Store the chart instance
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    fetchChartData() {
      axios.get('http://192.168.1.133:8001/api/charts/test2').then((response) => {
        this.chartData = response.data;
        console.log('test', response.data)
        this.createChart();
      })
    },
    createChart() {
      if (!this.chartData) return;
      const ctx = document.getElementById('myChart').getContext('2d');

      let scales = {};
      if (this.selectedChartType === 'line' || this.selectedChartType === 'bar') {
        scales = {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Y-Axis Title',
            },
          },
        };
      }
      this.chartInstance = new Chart(ctx, {
        type: this.selectedChartType, // Use the selected chart type
        data: this.chartData,
        options: {
          scales,
        },
      });
    },
    updateChartType() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.createChart();
      }
    },
  },
};
</script>
