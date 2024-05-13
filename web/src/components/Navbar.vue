<script setup>
defineProps({
  logo: String,
});
</script>

<template>
  <div class="top-0 flex h-24 w-full items-center justify-between bg-zinc-900">
    <img src="/logo.png" class="ml-4 w-16" alt="Logo" />
    <div class="mr-4 flex gap-4 ">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </div>
  </div>
</template>
