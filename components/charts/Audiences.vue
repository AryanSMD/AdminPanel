<script setup lang="ts">
import VChart from 'vue-echarts';

const props = defineProps<{
    theme: string
}>()

const option = computed(() => {
    return {
        title: {
            text: 'Audiences',
            textStyle: {
                color: props.theme
            },
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: '10%',
            textStyle: {
                color: props.theme
            },
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '45%',
                data: [
                    { value: 484, name: 'Childs' },
                    { value: 735, name: 'Teenagers' },
                    { value: 580, name: 'Youngs' },
                    { value: 1048, name: 'Students' },
                    { value: 300, name: 'Adults' },
                    { value: 300, name: 'Old Adults' },
                ],
                label: {
                    color: props.theme
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                },
            }
        ]
    }
});
</script>


<template>
    <VChart :option="option" autoresize />
</template>