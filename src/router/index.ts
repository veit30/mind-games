import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { RouteRecordNormalized } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Mind Games",
      metaTags: [
        {
          name: "description",
          content: "Mind Games",
        },
        {
          property: "og:description",
          content: "Mind Games",
        },
      ],
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/speed-solver",
    name: "SpeedSolver",
    component: () => import("../views/games/SpeedSolver.vue"),
    meta: {
      title: "Mind Games - Speed Solver",
      metaTags: [
        {
          name: "description",
          content: "Mind Games -> Speed Solver",
        },
        {
          property: "og:description",
          content: "Mind Games -> Speed Solver",
        },
      ],
    },
  },
  {
    path: "/chain-solver",
    name: "ChainSolver",
    component: () => import("../views/games/ChainSolver.vue"),
    meta: {
      title: "Mind Games - Chain Solver",
      metaTags: [
        {
          name: "description",
          content: "Mind Games -> Chain Solver",
        },
        {
          property: "og:description",
          content: "Mind Games -> Chain Solver",
        },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

type MetaTag = { [key: string]: string };

router.beforeEach((to, from, next) => {
  const nearestWithTitle: RouteRecordNormalized | undefined = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta: RouteRecordNormalized | undefined = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta: RouteRecordNormalized | undefined =
    from.matched
      .slice()
      .reverse()
      .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title as string;
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode?.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  (nearestWithMeta.meta.metaTags as Array<MetaTag>)
    .map((tagDef: MetaTag) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key: string) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag: HTMLMetaElement) => document.head.appendChild(tag));

  next();
});

export default router;
