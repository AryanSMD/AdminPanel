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
                        :list="defaults().getLanguages"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.languageLearningId"
                        @valueEmit="e => filter.languageLearningId = e"
                    >
                    </Dropdown>
                    <Dropdown
                        :placeHolder="'Select category...'"
                        :list="defaults().getCategories"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.categoryId"
                        @valueEmit="e => filter.categoryId = e"
                    >
                    </Dropdown>
                    <Dropdown
                        :placeHolder="'Select audience...'"
                        :list="defaults().getAudiences"
                        :listKey="'id'"
                        :listValue="'name'"
                        :valueProp="filter.audienceId"
                        @valueEmit="e => filter.audienceId = e"
                    >
                    </Dropdown>
                    <select v-model="filter.isDisabled">
                        <option :value="null" disabled selected>Select status...</option>
                        <option :value="false">{{ getStatus(0) }}</option>
                        <option :value="true">{{ getStatus(1) }}</option>
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
                    v-for="item in courses" 
                    :course="item"
                    :removeCourse="removeCourse"
                />
            </div>
            <Pagination />
        </div>
    </div>
</template>


<script setup lang="ts">
const courses = ref <Course[]> ();
const filter = ref <any> ({
    name: null,
    languageLearningId: null,
    categoryId: null,
    audienceId: null,
    isDisabled: null,
})


async function search(): Promise<void> {
    const { name, languageLearningId, categoryId, audienceId, isDisabled } = filter.value;
    courses.value = defaults().getCourses.filter(e =>
        name ? e.name.toUpperCase().includes(name.toUpperCase()) : e &&
        audienceId ? e.audienceId === audienceId : e &&
        categoryId ? e.categoryId === categoryId : e &&
        languageLearningId ? e.languageLearningId === languageLearningId : e &&
        isDisabled !== null ? e.isDisabled === isDisabled : e
    )
}

async function removeCourse(id: string): Promise<void> {
    const selectedCourse = defaults().getCourses.filter(e => e.id === id)[0];
    const msg = `"${selectedCourse.name}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        alerts().showAlert({ type:'success', msg: 'Removed', func:() => {} });
    }})
}

function clearFilters(): void {
    filter.value = {
        name: null,
        languageLearningId: null,
        categoryId: null,
        audienceId: null,
        isDisabled: null,
    };
}

courses.value = defaults().getCourses;
</script>


<style scoped></style>