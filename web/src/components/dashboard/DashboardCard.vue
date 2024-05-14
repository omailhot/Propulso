<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

defineProps({
  title: String,
});
</script>

<template>
  <Card>
    <CardContent>
      <h2 class="pt-4 pl-2 font-semibold">{{ title }}</h2>
      <slot />
    </CardContent>
  </Card>
</template>
