<script setup lang="ts">
import { AreaChart } from "@/components/ui/chart-area";
import { computed } from "vue";

const props = defineProps<{
  data: {
    year: number;
    month: number;
    value: number;
  }[];
  color: string;
}>();

const data = computed(() => {
  return props.data.map((d) => ({
    name: `${new Date(2022, d.month - 1, 1).toLocaleString("fr", { month: "long" })} ${d.year}`,
    total: Number(d.value).toFixed(2),
  }));
});
</script>

<template>
  <AreaChart
    :data="data"
    index="name"
    :categories="['total']"
    :colors="[color]"
  />
</template>
