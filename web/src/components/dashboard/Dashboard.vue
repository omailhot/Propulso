<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import DashboardCard from "./DashboardCard.vue";
import DashboardChartArea from "./DashboardChartArea.vue";
import DashboardChartBar from "./DashboardChartBar.vue";

import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import {
  getVisitDuration,
  getVisitsPerMonth,
  getDaysBetweenVisitorsVisits,
  getVisitorsPerMonth,
  getMoveSpeedPerMonth,
} from "@/queries/metrics";
import { useQuery } from "@tanstack/vue-query";
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const visitsPerMonthQuery = useQuery({
  queryKey: ["visitsPerMonth"],
  queryFn: getVisitsPerMonth,
});

const visitorsPerMonthQuery = useQuery({
  queryKey: ["visitorsPerMonth"],
  queryFn: getVisitorsPerMonth,
});

const visitDurationQuery = useQuery({
  queryKey: ["visitDuration"],
  queryFn: getVisitDuration,
});

const moveSpeedPerMonthQuery = useQuery({
  queryKey: ["moveSpeedPerMonth"],
  queryFn: getMoveSpeedPerMonth,
});

const daysBetweenVisitorsVisits = useQuery({
  queryKey: ["daysBetweenVisitorsVisits"],
  queryFn: getDaysBetweenVisitorsVisits,
});
</script>

<template>
  <div
    :class="cn('mb-4 flex flex-col gap-4 lg:grid lg:grid-cols-2', props.class)"
  >
    <DashboardCard title="Visites par mois">
      <DashboardChartBar
        color="#ffa000"
        v-if="visitsPerMonthQuery.data.value"
        :data="visitsPerMonthQuery.data.value"
      />
      <Skeleton v-else class="h-100 w-100 mx-auto mt-12 rounded-md" />
    </DashboardCard>
    <DashboardCard title="Visiteurs par mois">
      <DashboardChartBar
        color="#ff4b00"
        v-if="visitorsPerMonthQuery.data.value"
        :data="visitorsPerMonthQuery.data.value"
      />
      <Skeleton v-else class="h-100 w-100 mx-auto mt-12 rounded-md" />
    </DashboardCard>

    <DashboardCard title="Vitesse moyenne des déplacements par mois (en m/s)">
      <DashboardChartArea
        color="#ff0035"
        v-if="moveSpeedPerMonthQuery.data.value"
        :data="moveSpeedPerMonthQuery.data.value"
      />
      <Skeleton v-else class="h-100 w-100 mx-auto mt-12 rounded-md" />
    </DashboardCard>
    <div class="flex flex-col gap-4">
      <DashboardCard title="Durée moyenne des visites" class="flex-1">
        <div class="text-center">
          <h2
            v-if="visitDurationQuery.data.value"
            class="inline-block bg-gradient-primary bg-clip-text p-12 text-6xl font-semibold text-transparent"
          >
            {{ Number(visitDurationQuery.data.value / 60).toFixed(2) }} min
          </h2>
          <Skeleton v-else class="mx-auto mt-12 h-16 w-80 rounded-md" />
        </div>
      </DashboardCard>
      <DashboardCard
        title="Nombre de jour moyen entre les visites des visiteurs"
        class="flex-1"
      >
        <div class="text-center">
          <h2
            v-if="daysBetweenVisitorsVisits.data.value"
            class="inline-block bg-gradient-primary bg-clip-text p-12 text-6xl font-semibold text-transparent"
          >
            {{ Number(daysBetweenVisitorsVisits.data.value).toFixed(2) }} jours
          </h2>
          <Skeleton v-else class="mx-auto mt-12 h-16 w-80 rounded-md" />
        </div>
      </DashboardCard>
    </div>
  </div>
</template>
