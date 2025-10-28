<template>
  <section>
    <form
      @submit.prevent="handleSubmit"
      class="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-5 border border-gray-100"
    >
      <h2 class="text-xl font-semibold text-gray-800">
        {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
      </h2>

      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          Title <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          v-model="formData.title"
          @input="updateFormField('title', formData.title)"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Enter ticket title"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">
          {{ errors.title }}
        </p>
      </div>

      <!-- Description -->
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          v-model="formData.description"
          @input="updateFormField('description', formData.description)"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Enter ticket details"
        />
        <p v-if="errors.description" class="text-red-500 text-sm mt-1">
          {{ errors.description }}
        </p>
      </div>

      <!-- Status -->
      <div>
        <label
          for="status"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Status <span class="text-red-500">*</span>
        </label>
        <select
          id="status"
          v-model="formData.status"
          @change="updateFormField('status', formData.status)"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">
          {{ errors.status }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4">
        <button
          type="submit"
          class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
        >
          {{ editingTicket ? "Update Ticket" : "Create Ticket" }}
        </button>

        <button
          v-if="editingTicket"
          type="button"
          @click="resetForm"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../stores/ticketsStore";

const ticketsStore = useTicketsStore();
const { editingTicket, formData, errors } = storeToRefs(ticketsStore);

const { handleSubmit, resetForm, updateFormField } = ticketsStore;
</script>
