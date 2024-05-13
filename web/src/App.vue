<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Navbar />
  <div class="container">
    <HelloWorld msg="Vite + Vue" />
    <Button>Click me</Button>
  </div>
</template>
