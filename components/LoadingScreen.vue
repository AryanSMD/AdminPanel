<template>
    <div class="loading-screen" v-if="loadingScreen().getLoadingScreen && loadingScreen().getPermission">
        <div class="box">
            <div class="half-circle-spinner">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts"></script>


<style scoped>
.loading-screen {
    @apply
    fixed w-full h-full flex justify-center items-center top-0 left-0 z-[1000] bg-black 
    bg-opacity-70
}

.box {
    @apply
    aspect-square p-3 md:p-6 lg:p-10 flex flex-col items-center justify-center bg-background dark:bg-darkBackground
    rounded-md
}

.half-circle-spinner, .half-circle-spinner * {
    box-sizing: border-box;
}

.half-circle-spinner {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: relative;
}

.half-circle-spinner .circle {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
    border-top-color: var(--primary);
    animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
    border-bottom-color: var(--primary);
    animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>