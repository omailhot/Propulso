<script setup lang="ts">
import { AreaChart } from "@/components/ui/chart-area";

const data = [
  {
    name: "Jan",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    2021: Math.floor(Math.random() * 2000) + 500,
    2022: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <AreaChart
    :data="data"
    index="name"
    :categories="['2021', '2022']"
		:show-gradiant="true"
    :colors="['orange', 'red']"
  />
</template>
