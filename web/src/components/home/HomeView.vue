<script setup lang="ts">
import Button from "../ui/button/Button.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { initDatabase } from "@/queries/init";
import { ref } from "vue";
import LoadingSpinner from "../ui/loading-spinner/LoadingSpinner.vue";
import { RouterLink } from "vue-router";

const { toast } = useToast();

let isPending = ref(false);
let isSuccess = ref(false);

const initHandler = async () => {
  isPending.value = true;
  isSuccess.value = false;
  toast({
    title: "Chargement de la base de données...",
    description: "Cette opération peut prendre environ une minute.",
    duration: 60000,
  });

  await initDatabase().then((data) => {
    console.log(data);
    if (data.status === "success") {
      isSuccess.value = true;
      toast({
        title: "Base de données initialisée!",
        description: `${data.totalVisits} visites insérées en ${data.duration} secondes`,
        duration: 8000,
      });
    }
    if (data.status === "error") {
      toast({
        title: "Erreur lors de l'initialisation de la base de données",
        description: "Veuillez réessayer.",
      });
      return;
    }
    isPending.value = false;
  });
};
</script>

<template>
  <div
    v-if="!isPending"
    class="mt-24 flex flex-col items-center justify-center gap-8"
  >
    <div class="flex items-center justify-center gap-8">
      <h1>Étape 1</h1>
      <Button
        v-if="!isPending"
        :class="`h-16 w-64 rounded-full ${isSuccess && 'bg-muted'}`"
        @click="() => initHandler()"
        >Initialiser la base de données
      </Button>
    </div>

    <RouterLink
      class="mt-12 flex items-center justify-center gap-8"
      to="/dashboard"
      v-if="isSuccess"
    >
      <h1>Étape 2</h1>
      <Button class="h-16 w-64 rounded-full">Aller au tableau de bord </Button>
    </RouterLink>
  </div>
  <LoadingSpinner v-else class="mx-auto mt-24" />
</template>
