import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { RouteRecordNormalized } from "vue-router";
import GameSelection from "../views/GameSelection.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GameSelection",
    component: GameSelection,
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
    component: () => import("../views/SpeedSolver.vue"),
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

type MetaTagsData = {
  meta: { metaTags: Array<{ name: string; content: string }> };
};
type MetaTitle = { meta: { title: string } };
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
