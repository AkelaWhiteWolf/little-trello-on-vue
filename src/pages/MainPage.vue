<template>
  <v-layout>
    <v-main>
      <CandidatesGrid />
      <ChannelsChart />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCandidatesStore, useChannelsStore } from '@/stores';
import { CandidatesGrid, ChannelsChart } from '@/components';

const candidatesStore = useCandidatesStore();
const channelsStore = useChannelsStore();

onMounted(() => {
  candidatesStore.getDataFromServer();
  channelsStore.getDataFromServer();
});
</script>

<style lang=""></style>
