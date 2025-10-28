<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "../stores/ticketsStore";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
import TicketCard from "../components/TicketCard.vue";
import TicketForm from "../components/TicketForm.vue";

const router = useRouter();
const ticketsStore = useTicketsStore();
const { tickets } = storeToRefs(ticketsStore);

function goToDashboard() {
  router.push("/dashboard");
}
</script>

<template>
  <NavBar />

  <main
    class="px-4 py-10 max-w-[90rem] mx-auto min-h-[80vh] flex flex-col gap-10"
  >
    <section
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <h1 class="text-3xl font-semibold text-gray-900">Ticket Management</h1>
      <button
        @click="goToDashboard"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-sm font-medium transition-colors"
      >
        Back to Dashboard
      </button>
    </section>

    <TicketForm />

    <!-- Tickets List -->
    <section>
      <h2 class="text-lg md:text-xl font-medium mb-4">Created tickets</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p
          v-if="tickets.length === 0"
          class="text-gray-500 text-center col-span-full"
        >
          No tickets yet. Create your first one above!
        </p>

        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </div>
    </section>
  </main>

  <Footer />
</template>
