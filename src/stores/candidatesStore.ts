import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CandidateCardData } from '@/types';
import type { COLUMNS_DATA } from '@/data';

export const useCandidatesStore = defineStore('candidatesStore', () => {
  const data = ref<CandidateCardData[]>([]);
  const isLoading = ref(false);

  function setNewCandidateStatus(
    id: CandidateCardData['id'],
    newOrder: (typeof COLUMNS_DATA)[number]['order']
  ) {
    const selectedCandidate = data.value.find((candidate) => candidate.id === id);
    if (!selectedCandidate) throw new Error(`No candidate with id: ${id}`);
    selectedCandidate.employerStatusId = String(newOrder);
  }

  async function getDataFromServer() {
    isLoading.value = true;
    const response = await fetch('https://650d558fa8b42265ec2c07b8.mockapi.io/kek/submissions');
    const responseJson = await response.json();

    data.value = responseJson;
    isLoading.value = false;
  }

  return { data, isLoading, setNewCandidateStatus, getDataFromServer };
});
