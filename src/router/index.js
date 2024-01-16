import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  //   path: "/",
  //   name: "BarChart",
  //   component: () =>
  //     import( "../views/BarChart.vue"),
  // },
  // {
  //   path: "/",
  //   name: "ChartView",
  //   component: () =>
  //     import( "../views/ChartView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
