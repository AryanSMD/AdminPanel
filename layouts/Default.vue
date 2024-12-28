<template>
    <div :class="defaults().getDarkMode ? 'dark' : null">
        <div class="wrapper">
        <LoadingScreen />
        <Sidebar v-if="$route.meta.header" />
        <div class="main">
            <Header v-if="$route.meta.header" />
            <slot />
        </div>
        </div>
    </div>
</template>


<script setup>
onMounted(() => {
    defaults().defaultDarkMode();
    defaults().defaultSidebar();
})


onUpdated(async () => {
    window.onbeforeunload = async () => {
        return 'Changes you made may not be saved';
    }
})
</script>

<style scoped></style>