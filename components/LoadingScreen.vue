<template>
    <div class="loading-screen" v-if="loadingScreen().getLoadingScreen && loadingScreen().getPermission">
        <div class="spinner1"></div>
        <div class="spinner2"></div>
        <div class="spinner3"></div>
    </div>
</template>


<script setup lang="ts">
</script>


<style scoped>
.spinner1 {
    border: 7px solid var(--secondary);
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-right: 5px;
    animation: spinner .26s infinite alternate;
}

.spinner2 {
    border: 7px solid var(--secondary);
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-right: 5px;
    animation: spinner .26s infinite .075s alternate;
}

.spinner3 {
    border: 7px solid var(--secondary);
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-right: 5px;
    animation: spinner .26s infinite .15s alternate;
}

@keyframes spinner {
    100%{
        border: 4px solid white;
    }
}
</style>