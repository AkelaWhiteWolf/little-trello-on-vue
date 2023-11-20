import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CandidateCardData } from '@/types';
import type { COLUMNS_DATA } from '@/data';
import { getObjectDeepCopy } from '@/utils';

export const useCandidatesStore = defineStore('candidatesStore', () => {
  const data = ref<CandidateCardData[]>([]);
  const isLoading = ref(false);
  const newCandidateId = ref(0);

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
    const responseJson: CandidateCardData[] = await response.json();

    data.value = responseJson;
    isLoading.value = false;

    newCandidateId.value = responseJson.reduce(
      (accumulator, candidate) => (candidate.id >= accumulator ? candidate.id + 1 : accumulator),
      newCandidateId.value
    );
  }

  function createNewCandidate(firstName: string, lastName: string) {
    const newCandidate = {
      ...getObjectDeepCopy(data.value[0]),
      ...{
        id: newCandidateId.value,
        candidate: {
          id: newCandidateId.value,
          firstName,
          lastName,
          color: data.value[0].candidate.color
        }
      }
    };

    newCandidateId.value++;

    data.value.push(newCandidate);
  }

  return { data, isLoading, setNewCandidateStatus, getDataFromServer, createNewCandidate };
});
