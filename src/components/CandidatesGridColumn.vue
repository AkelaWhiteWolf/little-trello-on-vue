<template>
  <v-sheet class="column">
    <v-sheet class="name-container">
      <p>{{ column.name }}</p>
      <p class="count">{{ candidatesOfColumn.length }}</p>
    </v-sheet>
    <v-sheet class="data-container" @dragover.prevent @dragenter.prevent @drop.prevent="onDrop">
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

function onDrop(event: DragEvent) {
  if (event?.dataTransfer) {
    const id = Number(event.dataTransfer.getData('id'));
    candidatesStore.setNewCandidateStatus(id, column.order);
  }
}
</script>

<style scoped lang="scss">
.column {
  min-width: 250px;
  display: flex;
  flex-direction: column;

  .name-container {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    height: 80px;
    font-weight: bold;
    font-size: larger;
    .count {
      color: gray;
    }
  }
  .data-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #f4f4f4;
    padding: 10px;
    border-radius: 15px;
    flex-grow: 1;
  }
}
</style>
