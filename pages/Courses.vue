<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-add head" @click="$router.push({ name: 'add', params: { id: 'new' } })">
            Add Course
        </button>
        <div class="box">
            <div class="search-box">
                <div class="top">
                    <Dropdown
                        :placeHolder="'Select language...'"
                        :list="languagesApi().getLanguages"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.languageLearningId"
                        @valueEmit="e => filter.languageLearningId = e"
                    >
                    </Dropdown>
                    <Dropdown
                        :placeHolder="'Select category...'"
                        :list="categoriesApi().getCategories"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.categoryId"
                        @valueEmit="e => filter.categoryId = e"
                    >
                    </Dropdown>
                    <Dropdown
                        :placeHolder="'Select audience...'"
                        :list="audiencesApi().getAudiences"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.audienceId"
                        @valueEmit="e => filter.audienceId = e"
                    >
                    </Dropdown>
                    <select v-model="filter.status">
                        <option :value="null" disabled selected>Select status...</option>
                        <option :value="0">{{ getStatus(0) }}</option>
                        <option :value="1">{{ getStatus(1) }}</option>
                    </select>
                </div>
                <div class="bottom">
                    <input type="text" placeholder="Search by name ..." v-model="filter.name">
                    <button class="btn-search" @click="search()"></button>
                    <button class="btn-reset" @click="clearFilters()"></button>
                </div>
            </div>
            <div class="courses-box">
                <Course 
                    v-for="item in coursesApi().getCourses" 
                    :course="item"
                    :removeCourse="removeCourse"
                />
            </div>
            <Pagination 
                :numOfData="coursesApi().getTotal" 
                :func="async () => await getCourses()"
            />
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';


const searchMode = ref <boolean> (false);
const filter = ref <any> ({
    name: null,
    languageLearningId: null,
    categoryId: null,
    audienceId: null,
    status: null,
})


async function getCourses(): Promise<void> {
    if (!searchMode.value) {
        await coursesApi().searchCourses({
            page: defaults().pagination.currentPage,
            pageSize: defaults().pagination.dataPerPage 
        });
    }
}

async function search(): Promise<void> {
    searchMode.value = true;
    defaults().resetPagination();
    await coursesApi().searchCourses({
        page: defaults().pagination.currentPage,
        pageSize: defaults().pagination.dataPerPage,
        ...filter.value,
    });
    searchMode.value = false;
}

async function removeCourse(id: string): Promise<void> {
    const selectedCourse = coursesApi().getCourses.filter(e => e.id === id)[0];
    const msg = `"${selectedCourse.name}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        await coursesApi().removeCourse(id);
        await getCourses();
    }})
}

function clearFilters(): void {
    filter.value = {
        name: null,
        languageLearningId: null,
        categoryId: null,
        audienceId: null,
        status: null,
    };
}


onBeforeMount(async () => {
    defaults().resetPagination();
    await getCourses();
    await languagesApi().searchLanguages({ page: 0, pageSize: 0, });
    await audiencesApi().searchAudiences({ page: 0, pageSize: 0, });
    await categoriesApi().searchCategories({ page: 0, pageSize: 0, });
})
</script>


<style scoped></style>