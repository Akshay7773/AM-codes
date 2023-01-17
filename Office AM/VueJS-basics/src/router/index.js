import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MyFirst from "../views/MyFirst.vue";
import MySecond from "../views/MySecond.vue";
import ConditionalRendering from "../views/ConditionalRendering.vue";
import ListRendering from "../views/ListRendering.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/myfirst",
    name: "myfirst",
    component: MyFirst,
  },
  {
    path: "/mysecond",
    name: "mysecond",
    component: MySecond,
  },
  {
    path: "/conditional",
    name: "conditional",
    component: ConditionalRendering,
  },
  {
    path: "/lists",
    name: "lists",
    component: ListRendering,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
