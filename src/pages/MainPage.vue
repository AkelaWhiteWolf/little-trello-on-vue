<template>
  <v-layout>
    <v-main>
      <v-container class="container">
        <CreateCandidateModal :isOpened="isCreateCandidateModalOpened" />
        <CandidatesGrid />
        <ChannelsChart />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCandidatesStore, useChannelsStore } from '@/stores';
import { CandidatesGrid, ChannelsChart, CreateCandidateModal } from '@/components';

const candidatesStore = useCandidatesStore();
const channelsStore = useChannelsStore();

const isCreateCandidateModalOpened = ref(false);

onMounted(() => {
  candidatesStore.getDataFromServer();
  channelsStore.getDataFromServer();
});
</script>

<style scoped lang="scss">
.container {
  max-width: 1470px;
}
</style>
