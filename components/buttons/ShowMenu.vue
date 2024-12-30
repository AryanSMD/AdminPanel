<script setup lang="ts"></script>


<template>
    <div class="menu-btn" @click="defaults().setSidebar()">
        <div 
            class="line1"
            :class="defaults().getOpenSidebar && 'rotate-45 !top-auto'"
        ></div>
        <div
            class="line2"
            :class="defaults().getOpenSidebar && 'opacity-0'"
        ></div>
        <div 
            class="line3"
            :class="defaults().getOpenSidebar && '-rotate-45 !bottom-auto'"
        ></div>
    </div>
</template>


<style scoped>
.menu-btn {
    @apply
    w-8 h-6 cursor-pointer relative flex justify-center items-center overflow-hidden
}
.line1,
.line2,
.line3 {
    @apply
    absolute w-full h-[3px] bg-text dark:bg-white rounded-full transition-all duration-500
}
.menu-btn:hover > .line1,
.menu-btn:hover > .line2,
.menu-btn:hover > .line3 {
    @apply
    !bg-primary
}
.line1 {
    @apply
    top-0
}
.line3 {
    @apply
    bottom-0
}
</style>