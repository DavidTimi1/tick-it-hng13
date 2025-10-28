<template>
  <div>
    <NavBar />

    <main
      class="px-4 py-12 max-w-[90rem] mx-auto min-h-[80vh] flex flex-col gap-8"
    >
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
      >
        <h1 class="text-3xl font-semibold text-gray-900">
          Welcome back,
          <span class="text-orange-500">{{ user?.name }}</span>
        </h1>

        <!-- Navigation -->
        <div>
          <RouterLink
            to="/tickets"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Manage Tickets
          </RouterLink>
        </div>
      </div>

      <!-- Stats Section -->
      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
      >
        <div
          class="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100"
        >
          <h2 class="text-gray-600 text-sm uppercase tracking-wide">
            Total Tickets
          </h2>
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ stats.total }}</p>
        </div>

        <div
          class="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100"
        >
          <h2 class="text-gray-600 text-sm uppercase tracking-wide">Open</h2>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ stats.open }}</p>
        </div>

        <div
          class="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100"
        >
          <h2 class="text-gray-600 text-sm uppercase tracking-wide">
            In Progress
          </h2>
          <p class="text-3xl font-bold text-amber-500 mt-2">
            {{ stats.inProgress }}
          </p>
        </div>

        <div
          class="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100"
        >
          <h2 class="text-gray-600 text-sm uppercase tracking-wide">Closed</h2>
          <p class="text-3xl font-bold text-gray-500 mt-2">
            {{ stats.closed }}
          </p>
        </div>
      </section>

      <!-- Recent Activity -->
      <section>
        <h2 class="text-lg md:text-xl font-medium mb-4">Recent Activity</h2>

        <p v-if="tickets.length === 0" class="text-gray-500 text-center">
          No activity to show. Start by creating a ticket!
        </p>

        <div
          v-else
          class="flex overflow-x-scroll rounded-lg border border-[#cfdbe7] bg-slate-50"
        >
          <table class="flex-1">
            <thead>
              <tr class="bg-slate-50">
                <th
                  class="px-4 py-3 text-left text-[#0d141b] w-[400px] text-sm font-medium leading-normal"
                >
                  Title
                </th>
                <th
                  class="px-4 py-3 text-left text-[#0d141b] w-[400px] text-sm font-medium leading-normal"
                >
                  Description
                </th>
                <th
                  class="px-4 py-3 text-left text-[#0d141b] w-60 text-sm font-medium leading-normal"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <TicketRow
                v-for="ticket in tickets"
                :key="ticket.id"
                :ticket="ticket"
              />
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useTicketsStore } from "../stores/ticketsStore";

import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import TicketRow from "../components/TicketRow.vue";

const auth = useAuthStore();
const ticketsStore = useTicketsStore();

const { user } = storeToRefs(auth);
const { tickets } = storeToRefs(ticketsStore);

const stats = reactive({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0,
});

function computeStats() {
  stats.total = tickets.value.length;
  stats.open = tickets.value.filter((t) => t.status === "open").length;
  stats.inProgress = tickets.value.filter(
    (t) => t.status === "in_progress"
  ).length;
  stats.closed = tickets.value.filter((t) => t.status === "closed").length;
}

onMounted(computeStats);
watch(tickets, computeStats, { deep: true });
</script>
