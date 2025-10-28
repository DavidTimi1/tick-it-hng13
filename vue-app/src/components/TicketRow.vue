<template>
  <tr class="border-t border-t-[#cfdbe7]">
    <td
      class="h-[72px] px-4 py-2 w-[400px] text-[#0d141b] text-sm font-normal leading-normal"
    >
      {{ ticket.title }}
    </td>

    <td
      class="table-ec19de06-ade5-48db-9432-08f80a721c73-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4c739a] text-sm font-normal leading-normal"
    >
      {{ ticket.description || "Not specified" }}
    </td>

    <td class="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
      <button
        disabled
        :class="[
          'flex items-center justify-center overflow-hidden rounded-lg h-8 px-4 text-sm font-medium leading-normal',
          ticket.status === 'open'
            ? 'text-green-600 bg-green-100'
            : ticket.status === 'in_progress'
            ? 'text-amber-600 bg-amber-100'
            : 'text-gray-600 bg-gray-100',
        ]"
      >
        <span class="truncate">{{ formattedStatus }}</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";

const { ticket } = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const formattedStatus = computed(() => ticket.status.replace("_", " "));
</script>
