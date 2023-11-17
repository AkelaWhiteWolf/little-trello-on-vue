<template>
  <v-progress-circular v-if="candidatesStore.isLoading"></v-progress-circular>
  <v-sheet v-else class="candidates-grid">
    <CandidatesGridColumn v-for="column in COLUMNS_DATA" :key="column.id" :column="column" />
  </v-sheet>
</template>

<script setup lang="ts">
import { CandidatesGridColumn } from '@/components';
import { COLUMNS_DATA } from '@/data';
import { useCandidatesStore } from '@/stores';

const candidatesStore = useCandidatesStore();
</script>

<style scoped lang="scss">
.candidates-grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  min-height: 500px;
  overflow-x: auto;
}
</style>
