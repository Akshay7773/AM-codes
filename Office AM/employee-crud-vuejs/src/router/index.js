import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../components/UsersView.vue";
import AddUser from "../components/AddUser.vue";
import EditUser from "../components/EditUser.vue";
const routes = [
  {
    redirect: "add",
    path: "/",
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/add",
    name: "add",
    component: AddUser,
  },
  {
    path: "/edituser/:id",
    name: "edituser",
    component: EditUser,
  },
  // {
  //   path: "/about",
  //   name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
