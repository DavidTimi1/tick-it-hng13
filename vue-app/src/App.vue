<template>
  <RouterView />
</template>

<script setup>
/*
  In Vue, the routing logic is handled by <RouterView />,
  and the Auth + Tickets state providers are managed via Pinia stores.
  So we don't wrap the app in context providers like React — instead,
  Pinia stores are globally accessible once registered in main.js.
*/
</script>
