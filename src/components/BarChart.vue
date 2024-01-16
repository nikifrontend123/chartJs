<template>
    <div style="max-height: 80vh;">
      <!-- <div>
        <label for="chartType">Select Chart Type:</label>
        <select disabled id="chartType" v-model="selectedChartType" @change="updateChartType">
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="doughnut">Doughnut Chart</option>
          <option value="polarArea">Polar Area Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div> -->
  
      <button class="my-3" @click="toggleChartMode">{{ chartMode === 'dark' ? 'Dark Mode' : 'Light Mode' }}</button>
  
      <div :class="{ 'dark-chart': chartMode === 'dark' }">
        <canvas id="BarCHart"></canvas>
      </div>
    </div>
  </template> 
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  
  
  export default {
    props: {
      route: String,
      chart: String,
    },
    
    data() {
      return {
        chartData: null,
        selectedChartType: 'bar', // Default chart type is bar
        chartInstance: null, // Store the chart instance
        chartMode: 'dark', // Default chart mode is dark
      };
    },
    mounted() {
      this.selectedChartType = this.chart;
      this.fetchChartData();
    },
    methods: {
      fetchChartData() {
        axios.get(this.route).then((response) => {
          this.chartData = response.data.data;
          this.createChart();
        });
      },
      createChart() {
        if (!this.chartData) return;
        const ctx = document.getElementById('BarCHart').getContext('2d');
  
        let scales = {};
        if ( this.selectedChartType === 'bar') {
          scales = {
            y: {
              title: {
                display: true,
                text: this.chartData.titles[0],
              },
            },
            x: {
              title: {
                display: true,
                text: this.chartData.titles[1],
              },
            }
          }
        }
  
        // Customize colors and other options based on the chart mode
        const backgroundColor = this.chartMode === 'dark' ? 'rgb(25, 90, 255, 20)' : 'light background color';
        const borderColor = '#42b883';
        const fill = {
          target: 'origin',
          above: this.chartMode === 'dark' ? 'rgb(255, 0, 255, 0.1)' : 'rgb(255, 255, 0, 0.1)',
        };
  
        const plugin = {
          id: 'customCanvasBackgroundColor',
          beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || (this.chartMode === 'dark' ? 'green' : 'light background color');
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
          },
        };
  
        this.chartData.datasets[0].backgroundColor = backgroundColor;
        this.chartData.datasets[0].borderColor = borderColor;
        this.chartData.datasets[1].backgroundColor = backgroundColor;
        this.chartData.datasets[1].borderColor = borderColor;
        this.chartData.datasets[0].fill = fill;
        this.chartData.datasets[1].fill = fill;
  
        this.chartInstance = new Chart(ctx, {
          type: this.selectedChartType, // Use the selected chart type
          data: this.chartData,
          options: {
            scales,
            plugins: {
              customCanvasBackgroundColor: {
                color: this.chartMode === 'dark' ? 'white' : 'light background color',
              },
              title: {
                display: true,
                position: 'bottom',
                text: this.chartData.legend,
              },
            },
            elements: {
              line: {
                tension: 0.4,
              },
            },
            tooltips: {
              backgroundColor: '#f5f5f5',
              titleFontColor: '#333',
              bodyFontColor: '#666',
              bodySpacing: 4,
              xPadding: 12,
              mode: "nearest",
              intersect: 0,
              position: "nearest"
            },
          },
          plugins: [plugin],
        });
      },
      updateChartType() {
        if (this.chartInstance) {
          this.chartInstance.destroy();
          this.createChart();
        }
      },
      toggleChartMode() {
        this.chartMode = this.chartMode === 'dark' ? 'light' : 'dark';
        this.updateChartType();
      },
    },
  };
  </script>
  
  <style></style>
  