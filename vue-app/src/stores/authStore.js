import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // 🔹 STATE
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(true);

  // 🔹 GETTERS
  const userEmail = computed(() => user.value?.email || "");

  // 🔹 LOAD EXISTING SESSION
  function loadSession() {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData
      ? JSON.parse(storedData)
      : { users: [], currentUser: null };

    if (data.currentUser) {
      user.value = data.currentUser;
      isAuthenticated.value = true;
    } else {
      user.value = null;
      isAuthenticated.value = false;
    }

    isLoading.value = false;
  }

  // Call immediately so state is ready for router guards
  loadSession();

  // 🔹 SIGN UP
  function signup(name, email, password) {
    const storedData = localStorage.getItem("ticketapp_session");
    const storedUsers = storedData ? JSON.parse(storedData).users || [] : [];

    const userExists = storedUsers.find((u) => u.email === email);

    if (userExists) {
      toast.error("User already exists. Please login");
      return;
    }

    const newUser = { name, email, password, tickets: [] };
    storedUsers.push(newUser);

    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({ users: storedUsers, currentUser: null })
    );

    toast.success("Signup successful! Please login");
  }

  // 🔹 LOGIN
  function login(email, password) {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData ? JSON.parse(storedData) : { users: [] };
    const storedUsers = data.users || [];

    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({ users: storedUsers, currentUser: foundUser })
      );

      user.value = foundUser;
      isAuthenticated.value = true;
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid login credentials!");
      return false;
    }
  }

  // 🔹 LOGOUT
  function logout() {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData ? JSON.parse(storedData) : { users: [] };

    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({ users: data.users, currentUser: null })
    );

    user.value = null;
    isAuthenticated.value = false;
    toast.info("Logged out successfully");
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    userEmail,
    signup,
    login,
    logout,
  };
});
