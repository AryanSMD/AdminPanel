<script setup lang="ts">
const props = defineProps({
    course: {
        type: Object,
        required: true,
    },
    removeCourse: {
        type: Function,
        required: true,
    },
});

const language = computed(() => {
    return defaults().getLanguages.filter(e => e.id === props.course.languageLearningId)[0]?.name;
})

const audience = computed(() => {
    return defaults().getAudiences.filter(e => e.id === props.course.audienceId)[0]?.name;
})

const category = computed(() => {
    return defaults().getCategories.filter(e => e.id === props.course.categoryId)[0]?.name;
})
</script>


<template>
    <div class="card">
        <div class="img">
            <img :src="props.course.imageUrl">
        </div>
        <div class="header">
            <div>
                {{ props.course.name[0].toUpperCase() + props.course.name.slice(1) }}
            </div>
            <div class="status" v-if="!props.course.isDisabled">
                Active
            </div>
        </div>
        <div class="info">
            <div class="case">
                <div class="key">Language :</div>
                <div class="value">
                    {{ language }}
                </div>
            </div>
            <div class="case">
                <div class="key">Category :</div>
                <div class="value">
                    {{ category }}
                </div>
            </div>
            <div class="case">
                <div class="key">Audience :</div>
                <div class="value">
                    {{ audience }}
                </div>
            </div>
            <div class="case">
                <div class="key">Price :</div>
                <div class="value">
                    {{ props.course.price }}$
                </div>
            </div>
        </div>
        <div class="buttons">
            <button class="btn" @click="$router.push({ name: 'add', params: { id: props.course.id } })">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>
            <button class="btn" @click="props.removeCourse(props.course.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
        </div>
        <div class="free-flag" :class="props.course.price === 0 && '!visible'">
            Free
        </div>
        <div class="footnote">
            <div class="case">
                <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                    <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                </svg>
                23
            </div>
            <div class="case">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
                    <path d="M8 11h8"/>
                    <path d="M8 7h6"/>
                </svg>
                12
            </div>
            <div class="case">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <path d="M12 11h4"/>
                    <path d="M12 16h4"/>
                    <path d="M8 11h.01"/>
                    <path d="M8 16h.01"/>
                </svg>
                65
            </div>
            <div class="case">
                <svg class="svg" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <linearGradient x1="36" x2="476" y1="256" y2="256">
                        <stop offset="0" stop-color="#9dd6fc"/><stop offset=".0056" stop-color="#9dd6fc"/>
                        <stop offset="1" stop-color="#d17ff7"/>
                    </linearGradient>
                    <path d="m136 276c11.046 0 20-8.954 20-20v-60h40v60c0 11.046 8.954 20 20 20s20-8.954 20-20v-120c0-33.084-26.916-60-60-60s-60 26.916-60 60v120c0 11.046 8.954 20 20 20zm40-160c11.028 0 20 8.972 20 20v20h-40v-20c0-11.028 8.972-20 20-20zm140 60v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20s-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20zm160 196v-352c0-11.046-8.954-20-20-20h-400c-11.046 0-20 8.954-20 20v472c0 11.046 8.954 20 20 20h280c5.368 0 10.509-2.234 14.143-5.858l120-120c.023-.023.042-.049.065-.072 3.778-3.813 5.792-8.971 5.792-14.07zm-160 100h-240v-432h360v312h-100c-11.046 0-20 8.954-20 20zm91.715-80-51.715 51.715v-51.715zm-131.715-56c0 11.046-8.954 20-20 20h-120c-11.046 0-20-8.954-20-20s8.954-20 20-20h120c11.046 0 20 8.954 20 20zm0 80c0 11.046-8.954 20-20 20h-120c-11.046 0-20-8.954-20-20s8.954-20 20-20h120c11.046 0 20 8.954 20 20z" fill="currentColor"/>
                </svg>
                65
            </div>
        </div>
    </div>
</template>


<style scoped></style>