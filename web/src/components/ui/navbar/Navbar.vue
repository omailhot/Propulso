<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../button/Button.vue";
import router from "@/router";
</script>

<template>
  <div class="border-b">
    <div
      class="container top-0 flex h-16 w-full items-center justify-between text-white"
    >
      <RouterLink to="/">
        <h1
          class="inline-block bg-gradient-primary bg-clip-text text-2xl font-semibold text-transparent"
        >
          Propulso
        </h1>
      </RouterLink>
      <RouterLink to="/dashboard">
        <Button
          v-if="!router.hasRoute('dashboard')"
          class="h-8 rounded-full bg-muted"
          >Aller au tableau de bord</Button
        >
      </RouterLink>
    </div>
  </div>
</template>
