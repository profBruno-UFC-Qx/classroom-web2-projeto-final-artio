import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import Dashboard from "../pages/Dashboard.vue";

const router = createRouter({
  // router options
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
  ],
});

export default router;
