<template>
    <div class="chart-wrapper" data-test="chart" :style="{height: wrapperHeight + 'px'}">
        <bar :data="chartData" :options="options"></bar>
    </div>
</template>    
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Stat } from '@/models/pokemon.model';
import { chartGrowFactor, options } from '@/constants/chart-js.config';
import { statsToChart } from '@/utils/transformers';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{stats: Stat[]}>()

const wrapperHeight = props.stats.length * chartGrowFactor;
const chartData = statsToChart(props.stats)
</script>