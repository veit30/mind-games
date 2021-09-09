import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import GameSelection from "../views/GameSelection.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GameSelection",
    component: GameSelection,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/speed-solver",
    name: "SpeedSolver",
    component: () => import("../views/SpeedSolver.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
