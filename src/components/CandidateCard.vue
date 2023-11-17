<template>
  <v-sheet class="candidate-card" draggable ondragstart="onDragStart" ondragover="onDragOver">
    <v-sheet class="top">
      <v-avatar :color="data.candidate.color || 'blue'">{{ avatarLetters }}</v-avatar>
      <p class="full-name">
        {{ data.candidate.firstName }} <br />
        {{ data.candidate.lastName }}
      </p>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { getFirstLettersOfFullname } from '@/utils';
import type { CandidateCardData } from '@/types';
import { computed } from 'vue';

const { data } = defineProps<{
  data: CandidateCardData;
}>();

function onDragStart(event: DragEvent) {
  if (event?.dataTransfer) event.dataTransfer.setData('id', String(data.id));
}
function onDragOver(event: DragEvent) {
  event.preventDefault();
}

const avatarLetters = computed(() =>
  getFirstLettersOfFullname({ first: data.candidate.firstName, last: data.candidate.lastName })
);
</script>

<style scoped lang="scss">
.candidate-card {
  min-height: 100px;
  background: white;
  border-radius: 15px;
  border: 0.5px solid lightgrey;
  padding: 10px;
  &:hover {
    cursor: grab;
  }
  .top {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 70%;
    border-bottom: 1px solid lightgrey;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30%;
  }

  .full-name {
    font-weight: bold;
    color: gray;
  }
}
</style>
