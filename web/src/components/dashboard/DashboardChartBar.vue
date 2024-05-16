<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import { label } from "@unovis/ts/components/axis/style";

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
  <BarChart
    :data="data"
    index="name"
    :categories="['2021', '2022']"
    :colors="['#ffa000', '#ff0035']"
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
          : '';
      }
    "
    :rounded-corners="4"
  />
</template>
