const routes = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/about",
    component: () => import("@/views/about.vue"),
  },
];

export default routes;
