<template>
  <section
    aria-labelledby="formTitle"
    class="bg-white shadow-lg rounded-2xl w-full max-w-md p-8"
  >
    <h1
      id="formTitle"
      class="text-2xl font-bold text-center mb-4 text-green-700"
    >
      Create an Account
    </h1>

    <form
      aria-labelledby="formTitle"
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          v-model="formData.name"
          @blur="validateField('name', formData.name)"
          :aria-describedby="errors.name ? 'nameError' : null"
          :class="[
            'w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500',
            errors.name ? 'border-red-500' : 'border-gray-300',
          ]"
          placeholder="John Doe"
        />
        <p v-if="errors.name" id="nameError" class="text-red-500 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          v-model="formData.email"
          @blur="validateField('email', formData.email)"
          :aria-describedby="errors.email ? 'emailError' : null"
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

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="formData.password"
          @blur="validateField('password', formData.password)"
          :aria-describedby="errors.password ? 'passwordError' : null"
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

      <!-- Confirm Password -->
      <div>
        <label
          for="confirmedPassword"
          class="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmedPassword"
          name="confirmedPassword"
          type="password"
          v-model="formData.confirmedPassword"
          @blur="validateField('confirmedPassword', formData.confirmedPassword)"
          :aria-describedby="
            errors.confirmedPassword ? 'passwordConfirmError' : null
          "
          :class="[
            'w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500',
            errors.confirmedPassword ? 'border-red-500' : 'border-gray-300',
          ]"
          placeholder="••••••••"
        />
        <p
          v-if="errors.confirmedPassword"
          id="passwordConfirmError"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.confirmedPassword }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
      >
        Sign Up
      </button>
    </form>

    <p class="text-sm text-center text-gray-600 mt-4">
      Already have an account?
      <RouterLink
        to="/auth/login"
        class="text-green-600 pl-1 font-medium hover:underline"
      >
        Log in
      </RouterLink>
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { toast } from "vue3-toastify";
import { validateForm } from "../utils/validateForm";

const router = useRouter();
const { signup } = useAuthStore();

const isSubmitting = ref(false);
const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
});
const errors = reactive({});

function validateField(fieldName, value) {
  const singleFieldError = validateForm(
    fieldName === "name" ? value : formData.name,
    fieldName === "email" ? value : formData.email,
    fieldName === "password" ? value : formData.password,
    fieldName === "confirmedPassword" ? value : formData.confirmedPassword
  );

  errors[fieldName] = singleFieldError[fieldName];
}

function handleSubmit() {
  const validationErrors = validateForm(
    formData.name,
    formData.email,
    formData.password,
    formData.confirmedPassword
  );

  Object.assign(errors, validationErrors);

  const hasErrors = Object.values(validationErrors).some(
    (error) => error !== null
  );

  if (!hasErrors) {
    signup(formData.name, formData.email, formData.password);
    isSubmitting.value = true;

    setTimeout(() => {
      router.push("/auth/login");
      isSubmitting.value = false;

      formData.name = "";
      formData.email = "";
      formData.password = "";
      formData.confirmedPassword = "";
      Object.keys(errors).forEach((key) => (errors[key] = null));
    }, 2000);
  } else {
    toast.error("Please fix the form errors");
  }
}
</script>
