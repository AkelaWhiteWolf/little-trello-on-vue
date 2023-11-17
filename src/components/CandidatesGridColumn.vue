<template>
  <v-sheet class="column">
    <v-sheet class="name-container">
      <p>{{ column.name }}</p>
      <p>{{ candidatesOfColumn.length }}</p>
    </v-sheet>
    <v-sheet class="data-container">
      <CandidateCard
        v-for="candidate in candidatesOfColumn"
        :key="candidate.id"
        :data="candidate"
      />
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCandidatesStore } from '@/stores';
import { CandidateCard } from '@/components';
import { COLUMNS_DATA } from '@/data';

const { column } = defineProps<{
  column: (typeof COLUMNS_DATA)[number];
}>();

const candidatesStore = useCandidatesStore();

const candidatesOfColumn = computed(() =>
  candidatesStore.data.filter((candidate) => Number(candidate.employerStatusId) === column.order)
);
</script>

<style scoped lang="scss">
.column {
  min-width: 250px;

  .name-container {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    height: 80px;
    font-weight: bold;
    font-size: larger;
  }
  .data-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #f4f4f4;
    padding: 10px;
    border-radius: 15px;
    height: 100%;
  }
}
</style>
