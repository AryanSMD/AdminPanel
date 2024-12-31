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
                                :list="defaults().getCategories"
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
                                :list="defaults().getLanguages"
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
                                :list="defaults().getAudiences"
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
                                <img :src="newCourse.imageUrl" class="img" ref="previewImg">
                            </div>
                            <input type="file" style="display: none;" accept=".jpg, .jpeg" ref="chooseFile">
                            <button class="btn-addImg" @click="$refs.chooseFile.click()">add image</button>
                        </div>
                        <div class="inputs md:col-span-2 mt-5">
                            <label>Description</label>
                            <textarea>{{ newCourse.description }}</textarea>
                        </div>
                    </div>
                    <div class="footer">
                        <button class="btn-cancel" @click="$router.back()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, save)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute();
const previewImg = ref();
const chooseFile = ref();
const editMode = ref <boolean> (false);
const newCourse = ref <Course> ({
    id: '',
    name: '',
    description: '',
    price: 0,
    isDisabled: false,
    languageLearningId: '',
    categoryId: '',
    audienceId: '',
    imageUrl: '',
});


async function save(): Promise<void> {
    router.back();
    alerts().showAlert({ 
        type: 'success', 
        msg: editMode.value ? 'Course Updated' : 'Course Created',
        func: ()=>{}
    })
}


onBeforeMount(async () => {
    const courseId = route.params.id;
    if (courseId !== 'new') {
        editMode.value = true;
        const course = defaults().getCourses.filter(e => e.id === courseId)[0];
        if (!course) throw createError({ statusCode: 404 });
        newCourse.value = course;
    }
})
</script>


<style scoped></style>