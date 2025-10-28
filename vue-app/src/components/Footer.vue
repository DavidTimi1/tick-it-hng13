<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="w-full bg-gray-100 mt-auto">
    <div class="max-w-[90rem] mx-auto p-4 text-center text-gray-600 text-sm">
      © {{ year }} Tick-it. All rights reserved.
    </div>
  </footer>
</template>
