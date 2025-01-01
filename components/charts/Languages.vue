<script setup lang="ts">
import VChart from 'vue-echarts';

const props = defineProps<{
    theme: string
}>()

const option = computed(() => {
    return {
        title: {
            text: 'Languages',
            textStyle: {
                color: props.theme
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            textStyle: {
                color: props.theme
            },
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['French', 'Arabic', 'Spanish', 'Hindi', 'Chinese', 'English']
        },
        series: [
            {
                name: '2023',
                type: 'bar',
                data: [312000000, 332000000, 560000000, 609000000, 1140000000, 1515000000]
            },
            {
                name: '2024',
                type: 'bar',
                data: [282000000, 312000000, 520000000, 589000000, 1040000000, 1415000000]
            }
        ]
    }
});
</script>


<template>
    <VChart :option="option" autoresize />
</template>