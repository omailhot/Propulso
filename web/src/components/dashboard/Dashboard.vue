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
  <div
    :class="cn('mb-4 flex flex-col gap-4 lg:grid lg:grid-cols-2', props.class)"
  >
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
      <div class="text-center">
        <h2
          class="bg-gradient-primary inline-block bg-clip-text p-16 text-7xl font-semibold text-transparent"
        >
          91
        </h2>
      </div>
    </DashboardCard>
  </div>
</template>
