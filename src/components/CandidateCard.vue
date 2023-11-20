<template>
  <v-sheet class="candidate-card" draggable="true" @dragstart="onDragStart" @dragover.stop.prevent>
    <v-sheet class="top">
      <v-avatar :color="data.candidate.color || 'blue'">{{ avatarLetters }}</v-avatar>
      <p class="full-name">
        {{ data.candidate.firstName }} <br />
        {{ data.candidate.lastName }}
      </p>
    </v-sheet>

    <v-sheet class="bottom">
      <p>{{ data.adChannel }}</p>
      <v-sheet>
        <v-icon icon="mdi-clock-outline"></v-icon>
        <p>{{ createdTimeAgo }}</p>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getFirstLettersOfFullname } from '@/utils';
import type { CandidateCardData } from '@/types';

const { data } = defineProps<{
  data: CandidateCardData;
}>();

dayjs.extend(relativeTime);

function onDragStart(event: DragEvent) {
  if (event?.dataTransfer) event.dataTransfer.setData('id', String(data.id));
}

const avatarLetters = computed(() =>
  getFirstLettersOfFullname({ first: data.candidate.firstName, last: data.candidate.lastName })
);

const createdTimeAgo = computed(() => dayjs().to(dayjs(data.createdAt)));
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
    font-size: 12px;
    > p {
      color: lightgreen;
    }
    > div {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }

  .full-name {
    font-weight: bold;
    color: gray;
  }
}
</style>
