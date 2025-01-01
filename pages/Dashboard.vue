<script setup lang="ts">
const theme = computed(() => {
    return defaults().getDarkMode ? 'white' : '#3a4045';
})
</script>


<template>
    <div class="container" data-aos="fade-right" data-aos-duration="700">
        <div class="reports-box">
            <div class="report-card flex flex-col">
                <div class="key">
                    Courses
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
                    </svg>
                </div>
                <div class="value">23</div>
            </div>
            <div class="report-card flex flex-col">
                <div class="key">
                    Students
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                    </svg>
                </div>
                <div class="value">116</div>
            </div>
            <div class="report-card flex flex-col">
                <div class="key">
                    Online
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                </div>
                <div class="value">
                    11
                </div>
            </div>
            <div class="report-card flex flex-col">
                <div class="key">
                    Sales
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </div>
                <div class="value">67</div>
            </div>
        </div>
        <div class="box dashboard-box">
            <div class="left-side">
                <div class="card flex flex-col">
                    <ChartsCourses :theme="theme" />
                </div>
            </div>
            <div class="right-side">
                <div class="card flex flex-col">
                    <ChartsAudiences :theme="theme" />
                </div>
            </div>
        </div>
        <div class="box dashboard-box">
            <div class="left-side">
                <div class="card flex flex-col">
                    <ChartsCategories :theme="theme" />
                </div>
            </div>
            <div class="right-side">
                <div class="card flex flex-col">
                    <ChartsLanguages :theme="theme" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>