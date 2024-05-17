<script setup lang="ts">
import Navbar from "./components/ui/navbar/Navbar.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
    <Toaster />
  </div>
</template>
