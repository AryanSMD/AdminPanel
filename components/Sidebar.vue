<script setup lang="ts">
import { useTemplateRef } from 'vue';

const light = useTemplateRef('light');

function movelight(size: number) {
    light.value!.style.transform = `translateY(${ size }px)`;
}

const items = [
{
        pathName: "/dashboard",
        title: "Dashboard",
        icon: "fa-solid:tachometer-alt",
    },
    {
        pathName: "/courses",
        title: "Courses",
        icon: "ion:easel",
    },
    {
        pathName: "/users",
        title: "Users",
        icon: "fluent:people-community-12-filled",
    },
    {
        pathName: "/languages",
        title: "Languages",
        icon: "fluent:local-language-zi-24-filled",
    },
    {
        pathName: "/audiences",
        title: "Audiences",
        icon: "fluent:people-audience-20-filled",
    },
    {
        pathName: "/categories",
        title: "Categories",
        icon: "iconamoon:category-fill",
    },
]
</script>


<template>
    <div class="sidebar" :class="!defaults().getOpenSidebar && 'close'">
        <div class="navbar">
            <div 
                class="w-[3rem] aspect-square absolute top-1 text-background dark:text-darkBackground
                    flex justify-center"
            >
                <Icon name="ls:apple" class="h-full w-full"/>
            </div>
            <div class="links">
                <div 
                    ref="light"
                    class="light"
                    :class="defaults().getOpenSidebar ? 'w-[96%]' : 'w-[90%]'"
                ></div>
                <ButtonsNavbar
                    v-for="item in items"
                    :key="item.title"
                    :isOpenSidebar="defaults().getOpenSidebar"
                    :pathName="item.pathName" 
                    :title="item.title" 
                    :icon="item.icon"
                    :moveLight="movelight"
                />
            </div>
        </div>
    </div>
</template>


<style scoped>
.sidebar {
    @apply
    absolute top-[60px] lg:top-0 w-[250px] lg:relative min-[1700px]:w-[350px] h-full 
    bg-transparent transition-all duration-500 z-[100] pl-2 pr-1
    py-4 lg:py-2 flex justify-center items-center
}
.sidebar {
    &.close {
        @apply
        w-[0] lg:w-20
    }
}
.sidebar::-webkit-scrollbar {
    @apply
    hidden
}
.navbar {
    @apply
    w-full h-full bg-white dark:bg-darkPrimary rounded-[10px] overflow-hidden flex flex-col items-center
    justify-center relative transition-colors duration-300
}
.links {
    @apply
    w-full flex flex-col items-center relative
}
.light {
    @apply
    absolute top-0 right-0 h-[3rem] min-[1700px]:h-[4rem] bg-background dark:bg-darkBackground 
    rounded-l-full z-[1] transition-all duration-300
}
.light::before,
.light::after {
    content: '';
    --radius: 1.5rem;
    position: absolute;
    width: var(--radius);
    height: var(--radius);
    right: 0;
    transition: all .3s;
}
.light::before {
    border-radius: 0 0 100% 0;
    top: calc(var(--radius) * -1);
    box-shadow: var(--radius) var(--radius) 0 var(--radius) var(--background);
}
.dark .light::before {
    box-shadow: var(--radius) var(--radius) 0 var(--radius) var(--darkBackground);
}
.light::after {
    border-radius: 0 100% 0 0;
    bottom: calc(var(--radius) * -1);
    box-shadow: var(--radius) calc(var(--radius) * -1) 0 var(--radius) var(--background);
}
.dark .light::after {
    box-shadow: var(--radius) calc(var(--radius) * -1) 0 var(--radius) var(--darkBackground);
}
</style>