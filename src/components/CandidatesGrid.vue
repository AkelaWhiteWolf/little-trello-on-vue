<template>
  <v-sheet class="candidates-grid">
    <CandidatesGridColumn v-for="column in COLUMNS_DATA" :key="column.id" :column="column" />
  </v-sheet>
</template>

<script setup lang="ts">
import { CandidatesGridColumn } from '@/components';
import { COLUMNS_DATA } from '@/data';
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
