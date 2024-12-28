<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <div class="box">
            <div class="card">
                <div class="header form">Add Course</div>
                <VeeForm as="div" :validation-schema="validation.addCourse" 
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs">
                            <label>Course Name</label>
                            <VeeInput type="text" name="name" v-model="newCourse.name"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                            <label>Category</label>
                            <VeeInput name="category" class="hidden" v-model="newCourse.categoryId" />
                            <Dropdown
                                :placeHolder="''"
                                :list="categoriesApi().getCategories"
                                :listKey="'id'"
                                :listValue="'name'"
                                :valueProp="newCourse.categoryId"
                                @valueEmit="e => newCourse.categoryId = e"
                                :class="errors.category && submitCount > 0 && 'input-err'"
                            >
                            </Dropdown>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.category }}</div>
                            <label>Price</label>
                            <VeeInput type="number" name="price" v-model="newCourse.price"
                                :class="errors.price && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.price }}</div>
                        </div>
                        <div class="inputs">
                            <label>Language</label>
                            <VeeInput name="language" class="hidden" v-model="newCourse.languageLearningId" />
                            <Dropdown
                                :placeHolder="''"
                                :list="languagesApi().getLanguages"
                                :listKey="'id'"
                                :listValue="'name'"
                                :valueProp="newCourse.languageLearningId"
                                @valueEmit="e => newCourse.languageLearningId = e"
                                :class="errors.language && submitCount > 0 && 'input-err'"
                            >
                            </Dropdown>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.language }}</div>
                            <label>Audience</label>
                            <VeeInput name="audience" class="hidden" v-model="newCourse.audienceId"/>
                            <Dropdown
                                :placeHolder="''"
                                :list="audiencesApi().getAudiences"
                                :listKey="'id'"
                                :listValue="'name'"
                                :valueProp="newCourse.audienceId"
                                @valueEmit="e => newCourse.audienceId = e"
                                :class="errors.audience && submitCount > 0 && 'input-err'"
                            >
                            </Dropdown>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.audience }}</div>
                            <label>Status</label>
                            <div class="switch-btn md:mt-[5px]">
                                <div class="btn" :class="newCourse.isDisabled ? 'on' : 'off'" @click="newCourse.isDisabled = !newCourse.isDisabled">
                                    <div class="circle" :class="newCourse.isDisabled ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newCourse.isDisabled && 'off'">Active</div>
                                    <div class="text" :class="!newCourse.isDisabled && 'off'">Deactive</div>
                                </div>
                            </div>
                        </div>
                        <div class="image-container !mt-5 md:col-span-2 xl:!mt-0 xl:col-span-1">
                            <div class="image">
                                <img :src="setImg(newCourse)" class="img" ref="previewImg">
                            </div>
                            <input type="file" style="display: none;" accept=".jpg, .jpeg"
                                ref="chooseFile"
                                @change="selectImg()"
                            >
                            <button class="btn-addImg" @click="$refs.chooseFile.click()">add image</button>
                        </div>
                        <div class="inputs md:col-span-2 mt-5">
                            <label>Description</label>
                            <Editor
                                api-key="frlocmhn1q09gpla4ewouv1mf9z6bu5vqwdgetmy0ompbjb6"
                                :init="defaults().getTinyConfig"
                                v-model="newCourse.description"
                            />
                        </div>
                    </div>
                    <template v-if="editMode">
                        <div class="line-breaker">
                            <div class="title">
                                Course Program
                            </div>
                        </div>
                        <div class="course-program">
                            <div class="day" v-for="day, index in courseDaysApi().getCourseDays" :key="day.id">
                                <div class="header">
                                    <div class="title">
                                        Day {{ day.order }} - 
                                        <div>{{ day.name }}</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
                                            class="w-6 aspect-square transition-transform duration-500 ml-2 cursor-pointer"
                                            :class="showDay[index] && 'rotate-90'"
                                            @click="showDay[index] = !showDay[index]">
                                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </div>
                                    <div class="text-[18px] font-bold text-primary">
                                        {{ day.lessonCount }} Lessons
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-edit" @click="openModal(day.id)"></button>
                                        <button class="btn-del" @click="removeDay(day.id)"></button>
                                    </div>
                                </div>
                                <div class="height-auto" :class="!showDay[index] && 'show'">
                                    <div>
                                        <!-- <div class="lessons" v-for="item2, index2 in item.lessons">
                                            <div class="lesson">
                                                <div>
                                                    lesson {{ index2 + 1 }} - {{ item2.name }}
                                                </div>
                                                <div class="font-normal text-[16px]">
                                                    5 Tasks
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <button class="btn-del" @click=""></button>
                                                </div>
                                            </div>
                                        </div> -->
                                        <button class="btn-add ml-4 mt-2 mb-5" 
                                            @click="$router.push({ name:'addLesson', params: { id: 'new' } })"
                                        >
                                            Lesson
                                        </button>
                                    </div>
                                    <div class="line-divider !my-3"></div>
                                </div>
                            </div>
                            <div class="w-full pt-5">
                                <button class="btn-save !h-10" @click="createDay()">
                                    Add Day
                                </button>
                            </div>
                        </div>
                    </template>
                    <div class="footer">
                        <button class="btn-cancel" @click="$router.back()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, save)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
    <!-- <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Edit Day</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="{}"
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs col-span-3">
                            <label>Name</label>
                            <VeeInput type="text" name="name" v-model="newCourseDays.name"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                        </div>
                        <div class="inputs col-span-3 mt-5">
                            <label>Status</label>
                            <div class="switch-btn"
                                @click="newCourseDays.isDisabled = !newCourseDays.isDisabled"
                            >
                                <div class="btn" :class="newCourseDays.isDisabled ? 'on' : 'off'">
                                    <div class="circle" :class="newCourseDays.isDisabled ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newCourseDays.isDisabled && 'off'">Acitve</div>
                                    <div class="text" :class="!newCourseDays.isDisabled && 'off'">Deactive</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <button class="btn-cancel" @click="closeModal()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, editDay)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </transition> -->
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import Editor from '@tinymce/tinymce-vue'


const route = useRoute();
const previewImg = ref();
const chooseFile = ref();
const editMode = ref <boolean> (false);
const showModal = ref <boolean> (false);
const showDay = ref <boolean[]> ([]);
const newCourse = ref <Course> ({
    id: '',
    name: '',
    description: '',
    price: 0,
    isDisabled: false,
    languageLearningId: '',
    categoryId: '',
    audienceId: '',
    imageId: null,
    imageUrl: '',
});
const newCourseDays = ref <CourseDay> ({
    id: '',
    name: '',
    isDisabled: false,
    courseId: '',
    lessonCount: 0,
    order: 0,
});


async function getDays(): Promise<void> {
    await courseDaysApi().searchCourseDays({
        page: 0,
        pageSize: 0,
        courseId: newCourse.value.id,
    });
}

function setImg(course: Course): string {
    if (course.imageUrl) {
        const url = useRuntimeConfig().public.StorageURL + course.imageUrl;
        return url;
    } else {
        return defaults().deafultImg;
    }
}

async function selectImg(): Promise<void> {
    const file = chooseFile.value.files[0]; 
    // const response = await fileManagementApi().upload({
    //     properties: {
    //         fileName: file?.name,
    //         fileType: 0
    //     },
    //     file
    // })
    // if (response.status === 200) {
    //     newCourse.value.imageId = response.data.id;
    //     newCourse.value.imageUrl = response.data.url;
    //     if (editMode.value) {
    //         const updateRes = await coursesApi().updateCourse(newCourse.value);
    //         if (updateRes.status === 200) {
    //             previewImg.value.src = setImg(newCourse.value);
    //         }

    //     } else {
    //         previewImg.value.src = setImg(newCourse.value);
    //     }        
    // }
}

async function save(): Promise<void> {
    if (editMode.value) {
        await coursesApi().updateCourse(newCourse.value);
    } else {
        const res = await coursesApi().createCourse(newCourse.value);
        if (res.status === 200) {
            newCourse.value = res.data;
            editMode.value = true;
        }
    }
}

async function editDay(): Promise<void> {
    await courseDaysApi().updateCourseDay(newCourseDays.value);
    await getDays();
    closeModal();
}

async function createDay(): Promise<void> {
    await courseDaysApi().createCourseDay({
        id: '',
        name: 'Title',
        isDisabled: false,
        courseId: newCourse.value.id,
        lessonCount: 0,
        order: 0,
    });
    await getDays();
}

async function removeDay(id: string): Promise<void> {
    const selectedDay = courseDaysApi().getCourseDays.filter(e => e.id === id)[0];
    const msg = `"${selectedDay.name}"`;
    alerts().showAlert({type:'delete', msg, func: async () => {
        await courseDaysApi().removeCourseDay(id);
        await getDays();
    }})
}

function openModal(id: string): void {
    const day = courseDaysApi().getCourseDays.filter(e => e.id === id)[0];
    newCourseDays.value = { ...day };
    showModal.value = true;
}

function closeModal(): void {
    newCourseDays.value = {
        id: '',
        name: '',
        isDisabled: false,
        courseId: '',
        lessonCount: 0,
        order: 0,
    };
    showModal.value = false;
}


onBeforeMount(async () => {
    const courseId = route.params.id;
    if (courseId !== 'new') {
        editMode.value = true;
        const course = coursesApi().getCourses.filter(e => e.id === courseId)[0];
        if (!course) throw createError({ statusCode: 404 });
        newCourse.value = course;
        await getDays();
    }
})
</script>


<style scoped></style>