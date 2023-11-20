<template>
  <v-layout>
    <v-main>
      <v-container class="container">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="80"
          :width="12"
          v-if="isLoading"
        ></v-progress-circular>
        <template v-else>
          <CreateCandidateModal :isOpened="isCreateCandidateModalOpened" />
          <CandidatesGrid />
          <ChannelsChart />
        </template>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useCandidatesStore, useChannelsStore } from '@/stores';
import { CandidatesGrid, ChannelsChart, CreateCandidateModal } from '@/components';

const candidatesStore = useCandidatesStore();
const channelsStore = useChannelsStore();

const isCreateCandidateModalOpened = ref(false);

const isLoading = computed(() => candidatesStore.isLoading || channelsStore.isLoading);

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
