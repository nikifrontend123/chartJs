import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    chartData: {
      labels: [],
      datasets: [],
      // datasets: [
      //   {
      //     label: 'Month Chart',
      //     data: [10, 10, 10, 10, 10, 10, 10],
      //     backgroundColor: [
      //       'rgba(255, 99, 132, 1)',  // Color for January
      //       'rgba(255, 159, 64, 1)',  // Color for February
      //       'rgba(255, 205, 86, 1)',  // Color for March
      //       'rgba(75, 192, 192, 1)',  // Color for April
      //       'rgba(54, 162, 235, 1)',  // Color for May
      //       'rgba(252, 102, 65, 1)',  // Color for June
      //       'rgba(40, 92, 65, 2)',  // Color for July
      //     ],
      //   },
      //   {
      //     label: 'Month Chart',
      //     data: [30, 30, 30, 30, 30, 30, 30],
      //     backgroundColor: [
      //       'rgba(255, 99, 12, 1)',  // Color for January
      //       'rgba(255, 59, 64, 1)',  // Color for February
      //       'rgba(25, 205, 86, 1)',  // Color for March
      //       'rgba(75, 12, 192, 1)',  // Color for April
      //       'rgba(54, 162, 25, 1)',  // Color for May
      //       'rgba(252, 102, 65, 1)',  // Color for June
      //       'rgba(4, 2, 65, 2)',  // Color for July
      //     ],
      //   },
      // ],
    },
    datas: []
  },
  getters: {
    getChartData(state) {
      return state.chartData;
    },
    getDatas(state) {
      return state.datas;
    },
  },
  mutations: {
    setData(state, data) {
      state.chartData.labels = data.labels;  
      state.chartData.datasets = data.datasets;  
      // state.chartData = data;
    }
  },
  actions: {
    updateChartData({ commit }, data) {
      commit('setDatas', data);
    },
    fetchData({ commit }) {
      axios.get('http://192.168.1.133:8001/api/charts/test2').then(response => {
        console.log('test', response.data);
        commit('setData', response.data);
      })
    }
  },

  modules: {},
});
