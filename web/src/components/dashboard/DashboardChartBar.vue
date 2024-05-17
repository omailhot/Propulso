<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import { computed } from "vue";

const props = defineProps<{
  data: {
    year: number;
    month: number;
    value: number;
  }[],
  color: string;
}>();

const data = computed(() => {
  return props.data.map((d) => ({
    name: `${new Date(2022, d.month - 1, 1).toLocaleString("fr", { month: "long" })} ${d.year}`,
    total: d.value,
  }));
});
</script>

<template>
  <BarChart
    :data="data"
    index="name"
    :categories="['total']"
    :colors="[color]"
    :show-legend="true"
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('fr').format(tick).toString()}`
          : '';
      }
    "
    :rounded-corners="4"
  />
</template>
