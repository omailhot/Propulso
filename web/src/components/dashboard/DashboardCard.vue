<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

defineProps({
  title: String,
});
</script>

<template>
  <Card>
    <CardContent>
      <h2
        class="text-white pl-2 pt-4 font-semibold"
      >
        {{ title }}
      </h2>
      <slot />
    </CardContent>
  </Card>
</template>
