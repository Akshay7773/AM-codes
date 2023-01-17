import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import CartView from "../components/CartView.vue";
import ConfirmOrder from "../components/ConfirmOrder.vue";
const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/confirmOrder",
    name: "confirmOrder",
    component: ConfirmOrder,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
