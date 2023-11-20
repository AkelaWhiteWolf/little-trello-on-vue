import type { ChannelsChartStatistic, ChannelsData } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCandidatesStore } from '@/stores';

export const useChannelsStore = defineStore('channelsStore', () => {
  const candidatesStore = useCandidatesStore();

  const data = ref<ChannelsData[]>([]);
  const isLoading = ref(false);

  async function getDataFromServer() {
    isLoading.value = true;
    const response = await fetch('https://650d558fa8b42265ec2c07b8.mockapi.io/kek/channels');
    const responseJson = await response.json();

    data.value = responseJson;
    isLoading.value = false;
  }

  function getDataForChart() {
    if (!candidatesStore?.data || !data.value) {
      throw new Error('No channels or candidates data on Store!');
    } else {
      const statistic: ChannelsChartStatistic[] = [];

      data.value.forEach(({ id, name }) => {
        statistic.push({ id, name, value: 0 });
      });
      candidatesStore.data.forEach(({ channelId }) => {
        const requiredChannel = statistic.find(({ id }) => id === channelId);

        if (requiredChannel) {
          requiredChannel.value++;
        } else {
          throw new Error('Candidate id does not match any channel');
        }
      });

      const result: {
        names: ChannelsChartStatistic['name'][];
        values: ChannelsChartStatistic['value'][];
      } = {
        names: [],
        values: []
      };

      statistic.forEach(({ name, value }) => {
        result.names.push(name);
        result.values.push(value);
      });

      return result;
    }
  }

  return { data, isLoading, getDataFromServer, getDataForChart };
});
