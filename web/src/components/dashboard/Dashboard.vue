<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import DashboardCard from "./DashboardCard.vue";
import DashboardChartArea from "./DashboardChartArea.vue";
import DashboardChartBar from "./DashboardChartBar.vue";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex flex-col gap-4 lg:grid lg:grid-cols-2', props.class)">
    <DashboardCard title="Visites par mois"
      ><DashboardChartBar />
    </DashboardCard>
    <DashboardCard title="Visiteurs par mois"
      ><DashboardChartBar />
    </DashboardCard>
    <DashboardCard title="Durée moyenne des visites"
      ><DashboardChartArea />
    </DashboardCard>
    <DashboardCard title="Vitesse moyenne des déplacements par mois"
      ><DashboardChartArea />
    </DashboardCard>
    <DashboardCard title="Nombre de jour moyen entre les visites des visiteurs">
      <h2 class="flex items-center justify-center p-16 text-6xl font-semibold">
        91
      </h2>
    </DashboardCard>
  </div>
</template>
