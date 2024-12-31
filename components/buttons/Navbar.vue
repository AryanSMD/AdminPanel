<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const item = useTemplateRef('item');
const props = defineProps<{
    isOpenSidebar: boolean,
    moveLight: Function,
    pathName: string,
    icon: string,
    title: string
}>()

onMounted(() => {
    route.path === props.pathName && props.moveLight(item.value?.offsetTop);
})

watch(
    ()=> route.path, (newVal) => {
        newVal === props.pathName && props.moveLight(item.value?.offsetTop);
    }
)
</script>


<template>
    <div class="w-full" ref="item">
        <nuxt-link
            :to="props.pathName"
            class="item"
            :class="!props.isOpenSidebar ? 'justify-center' : 'pl-5'"
            @click="moveLight(item?.offsetTop)"
        >
            <Icon :name="props.icon" class="icon" />
            <div v-if="props.isOpenSidebar">
                {{ props.title }}
            </div>
        </nuxt-link>
    </div>
</template>


<style scoped>
.item {
    @apply
    w-full h-[3rem] min-[1700px]:h-[4rem] flex items-center gap-3 relative z-[2] cursor-pointer text-text dark:text-white
    transition-all duration-300 text-[1.1rem] min-[1700px]:text-[1.4rem] font-bold
}
.icon {
    @apply
    w-[1.7rem] h-[1.7rem] min-[1700px]:w-[2rem] min-[1700px]:h-[2rem] transition-transform duration-300
}
.link-active {
    filter: drop-shadow(0 0 10px var(--primary));
    @apply
    !text-primary
}
.link-exact-active {
    @apply
    !text-primary
}
</style>