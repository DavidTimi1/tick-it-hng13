<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../stores/authStore";
import { validateForm } from "../utils/validateForm";

const router = useRouter();
const auth = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

const errors = reactive({});

const validateField = (fieldName, value) => {
  const validation = validateForm(
    null,
    fieldName === "email" ? value : formData.email,
    fieldName === "password" ? value : formData.password,
    null
  );

  errors[fieldName] = validation[fieldName];
};

const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateForm(
    null,
    formData.email,
    formData.password,
    null
  );
  errors.email = validationErrors.email;
  errors.password = validationErrors.password;

  if (!errors.email && !errors.password) {
    const success = auth.login(formData.email, formData.password);
    if (success) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      formData.email = "";
      formData.password = "";
      errors.email = "";
      errors.password = "";
    }
  } else {
    toast.error("Please fix the form errors");
  }
};
</script>

<template>
  <section
    aria-labelledby="formTitle"
    class="bg-white shadow-lg rounded-2xl w-full max-w-md p-8"
  >
    <h1
      id="formTitle"
      class="text-2xl font-bold text-center mb-6 text-green-700"
    >
      Login to continue
    </h1>

    <form
      @submit="handleSubmit"
      aria-labelledby="formTitle"
      class="flex flex-col gap-4"
    >
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          id="email"
          name="email"
          type="email"
          v-model="formData.email"
          @blur="validateField('email', formData.email)"
          aria-describedby="emailError"
          :class="[
            'w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500',
            errors.email ? 'border-red-500' : 'border-gray-300',
          ]"
          placeholder="name@example.com"
        />
        <p
          v-if="errors.email"
          id="emailError"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.email }}
        </p>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          id="password"
          name="password"
          type="password"
          v-model="formData.password"
          @blur="validateField('password', formData.password)"
          aria-describedby="passwordError"
          :class="[
            'w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500',
            errors.password ? 'border-red-500' : 'border-gray-300',
          ]"
          placeholder="••••••••"
        />
        <p
          v-if="errors.password"
          id="passwordError"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.password }}
        </p>
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Login
      </button>
    </form>

    <p class="text-sm text-center text-gray-600 mt-4">
      Don't have an account?
      <RouterLink
        to="/auth/signup"
        class="text-green-600 pl-1 font-medium hover:underline"
      >
        Sign up
      </RouterLink>
    </p>
  </section>
</template>
