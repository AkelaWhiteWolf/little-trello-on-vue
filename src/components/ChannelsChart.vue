<template>
  <BarChart v-bind="barChartProps" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { BarChart, useBarChart } from 'vue-chart-3';
import { useChannelsStore } from '@/stores';

Chart.register(...registerables);

const channelsStore = useChannelsStore();

const dataForChart = computed(channelsStore.getDataForChart);

const chartData = computed(() => ({
  labels: dataForChart.value.names,
  datasets: [
    {
      data: dataForChart.value.values,
      backgroundColor: 'blue'
    }
  ]
}));

const { barChartProps } = useBarChart({
  chartData
});
</script>

<style scoped lang="scss"></style>
