<template>
  <v-layout>
    <v-main>
      <CandidatesGrid />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCandidatesStore } from '@/stores';
import { CandidatesGrid } from '@/components';

const candidatesStore = useCandidatesStore();

onMounted(() => {
  candidatesStore.getDataFromServer();
});
</script>

<style lang=""></style>
