<script setup lang="ts">
defineProps({
  logo: String,
});
</script>

<template>
  <div class="border-b">
    <div
      class="container top-0 flex h-16 w-full items-center justify-between text-white"
    >
      <a href="#">
        <img src="/logo.png" class="ml-2 w-12" alt="Logo" />
      </a>
    </div>
  </div>
</template>
