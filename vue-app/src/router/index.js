import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import TicketsPage from "@/views/TicketsPage.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/auth/login", component: LoginPage },
    { path: "/auth/signup", component: SignupPage },
    {
      path: "/dashboard",
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/tickets",
      component: TicketsPage,
      meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = !auth.isAuthenticated;

  if (to.meta.requiresAuth && isAuthenticated.value) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
