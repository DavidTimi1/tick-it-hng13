<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/close.svg";

const router = useRouter();
const auth = useAuthStore();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleLogout = () => {
  auth.logout();
  router.push("/");
};
</script>

<template>
  <header class="w-full bg-white shadow-sm">
    <nav class="max-w-[90rem] mx-auto flex items-center justify-between p-4">
      <RouterLink to="/" class="text-2xl font-bold text-green-700">
        Tick-it
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden sm:flex items-center gap-4 text-gray-700">
        <template v-if="!auth.isAuthenticated">
          <li>
            <RouterLink to="/auth/login" class="hover:text-green-600 transition">
              Login
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/auth/signup"
              class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Sign Up
            </RouterLink>
          </li>
        </template>

        <template v-else>
          <li>
            <RouterLink to="/" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
              >
                Home
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
              >
                Dashboard
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/tickets" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
              >
                Tickets
              </span>
            </RouterLink>
          </li>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </template>
      </ul>

      <!-- Hamburger Icon for Mobile -->
      <button
        @click="toggleMobileMenu"
        class="sm:hidden flex items-center p-2 text-gray-700 hover:text-green-600 transition"
      >
        <img
          :src="MenuIcon"
          alt="Menu icon"
          class="w-6 h-6"
          :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
        />
        <img
          :src="CloseIcon"
          alt="Close icon"
          class="w-6 h-6"
          :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      class="sm:hidden bg-white shadow-md"
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
    >
      <ul class="flex flex-col items-center p-4 space-y-4">
        <template v-if="!auth.isAuthenticated">
          <li>
            <RouterLink
              to="/auth/login"
              class="text-gray-700 hover:text-green-600 transition py-2"
              @click="toggleMobileMenu"
            >
              Login
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/auth/signup"
              class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition my-2"
              @click="toggleMobileMenu"
            >
              Sign Up
            </RouterLink>
          </li>
        </template>

        <template v-else>
          <li>
            <RouterLink to="/" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
                @click="toggleMobileMenu"
              >
                Home
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
                @click="toggleMobileMenu"
              >
                Dashboard
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/tickets" v-slot="{ isActive }">
              <span
                :class="[
                  'hover:text-green-600 transition',
                  isActive ? 'text-green-700' : '',
                ]"
                @click="toggleMobileMenu"
              >
                Tickets
              </span>
            </RouterLink>
          </li>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition my-2"
          >
            Logout
          </button>
        </template>
      </ul>
    </div>
  </header>
</template>
