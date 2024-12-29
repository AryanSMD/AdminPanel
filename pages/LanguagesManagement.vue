<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-add head" @click="showModal = true">
            Add Language
        </button>
        <div class="box">
            <div class="search-box">
                <div class="top">
                    <select v-model="filter.isDisabled">
                        <option :value="null" disabled selected>Select Status...</option>
                        <option :value="false">Active</option>
                        <option :value="true">Deactive</option>
                    </select>
                </div>
                <div class="bottom">
                    <input type="text" placeholder="Search by name ..." v-model="filter.name">
                    <button class="btn-search" @click="search()"></button>
                    <button class="btn-reset" @click="clearFilters()"></button>
                </div>
            </div>
            <div class="card">
                <div class="header">
                    <svg class="svg" fill="currentColor" viewBox="0 0 511.996 511.996" xmlns="http://www.w3.org/2000/svg">
                        <path d="m511.065 346.918-25.418-68.772c17.262-27.451 26.349-58.971 26.349-91.65 0-95.115-77.382-172.497-172.498-172.497-87.145 0-159.392 64.961-170.89 149h-153.608c-8.284 0-15 6.716-15 15v305c0 5.359 2.859 10.311 7.5 12.99 2.32 1.34 4.91 2.01 7.5 2.01s5.18-.67 7.5-2.01l90.05-51.99h198.45c8.284 0 15-6.716 15-15v-70.531c4.455.346 8.956.526 13.498.526 27.876 0 55.337-6.748 79.87-19.573l72.427 26.768c1.695.627 3.453.931 5.198.931 3.91 0 7.746-1.53 10.609-4.394 4.141-4.142 5.493-10.315 3.463-15.808zm-215.065 67.08h-187.469c-2.633 0-5.22.693-7.5 2.01l-71.031 41.009v-264.02h137.135c.89 23.873 6.65 46.518 16.32 66.973h-17.455v-5.232c0-8.284-6.716-15-15-15s-15 6.716-15 15v5.232h-42.709c-8.284 0-15 6.716-15 15s6.716 15 15 15h69.693l-11.155 13.693-3.085-3.973c-5.081-6.544-14.505-7.728-21.047-2.647-6.543 5.081-7.729 14.505-2.647 21.048l7.333 9.443-30.135 36.99c-5.232 6.423-4.268 15.871 2.155 21.104 2.784 2.269 6.134 3.371 9.465 3.371 4.354 0 8.673-1.887 11.638-5.525l25.76-31.62 16.072 20.697c2.957 3.808 7.383 5.801 11.857 5.801 3.215 0 6.454-1.029 9.189-3.153 6.543-5.081 7.729-14.505 2.647-21.048l-20.32-26.167 29.686-36.438c.411-.505.771-1.034 1.106-1.573h.065c23.101 30.715 56.205 53.496 94.431 63.463v60.562zm158.873-132.579 16.755 45.332-48.281-17.844c-4.184-1.547-8.839-1.15-12.703 1.081-21.524 12.433-46.126 19.005-71.146 19.005-78.574 0-142.498-63.925-142.498-142.498s63.924-142.497 142.498-142.497 142.498 63.924 142.498 142.497c0 29.197-8.774 57.265-25.373 81.168-2.795 4.024-3.449 9.16-1.75 13.756z"/>
                        <path d="m352.609 107.995c-2.443-5.334-7.771-8.754-13.638-8.754-.001 0-.003 0-.005 0-5.868.002-11.197 3.426-13.637 8.763l-60.76 132.89c-3.445 7.534-.13 16.435 7.404 19.879 7.533 3.445 16.435.129 19.879-7.404l16.459-35.999h61.391l16.659 36.375c2.522 5.508 7.96 8.758 13.647 8.758 2.089-.001 4.213-.439 6.237-1.366 7.532-3.449 10.841-12.352 7.392-19.884zm-30.58 79.374 16.953-37.079 16.982 37.079z"/>
                    </svg>
                    Languages
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="img"></th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th class="last"></th>
                            <th class="last"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="language in defaults().getLanguages" :key="language.id">
                            <td class="img">
                                <img :src="defaults().returnFlagImg(language.slug) ?? defaults().deafultImg" ref="profImg">
                            </td>
                            <td>
                                {{ language.name }}
                            </td>
                            <td>
                                {{ language.code }}
                            </td>
                            <td>
                                {{ language.slug }}
                            </td>
                            <td>
                                {{ language.isDisabled ? 'Deactive' : 'Active' }}
                            </td>
                            <td>
                                <button class="btn-edit" @click="edit(language.id)"></button>
                            </td>
                            <td>
                                <button class="btn-del" @click="removeLanguage(language.id)"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    :numOfData="defaults().totalLanguages"
                    :func="async () => {}"
                />
            </div>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Add Language</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="validation.addLanguage"
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs">
                            <label>Name</label>
                            <VeeInput type="text" name="name" v-model="newLanguage.name"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                            <label>Slug</label>
                            <VeeInput type="text" name="slug" v-model="newLanguage.slug"
                                :class="errors.slug && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.slug }}</div>
                        </div>
                        <div class="inputs">
                            <label>Code</label>
                            <VeeInput type="text" name="code" v-model="newLanguage.code"
                                :class="errors.code && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.code }}</div>
                            <label>Status</label>
                            <div class="switch-btn"
                                @click="newLanguage.isDisabled = !newLanguage.isDisabled"
                            >
                                <div class="btn" :class="newLanguage.isDisabled ? 'on' : 'off'">
                                    <div class="circle" :class="newLanguage.isDisabled ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newLanguage.isDisabled && 'off'">Acitve</div>
                                    <div class="text" :class="!newLanguage.isDisabled && 'off'">Deactive</div>
                                </div>
                            </div>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.status }}</div>
                        </div>
                        <div class="image-container">
                            <div class="image">
                                <img :src="defaults().returnFlagImg(newLanguage.slug)" class="img" ref="previewImg">
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <button class="btn-cancel" @click="closeModal()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, save)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </transition>
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';


const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const previewImg = ref();
const filter = ref({
    keyword: null,
    name: null,
    code: null,
    slug: null,
    isDisabled: null,
})
const newLanguage = ref <Language> ({
    id: '',
    name: '',
    code: '',
    slug: '',
    isDisabled: false,
})


async function search(): Promise<void> {
}

async function save(): Promise<void> {

}

function edit(id: string): void {
    const selectedLanguage = defaults().getLanguages.filter(e => e.id === id)[0];
    newLanguage.value = { ...selectedLanguage };
    showModal.value = true;
    editMode.value = true;
}

function closeModal(): void {
    newLanguage.value = {
        id: '',
        name: '',
        code: '',
        slug: '',
        isDisabled: false,
    };
    editMode.value && (editMode.value = false);
    showModal.value = false;
}

async function removeLanguage(id: string): Promise<void> {
    const selectedLanguage = defaults().getLanguages.filter(e => e.id === id)[0];
    const msg = `"${selectedLanguage.name}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        alerts().showAlert({ type:'success', msg: 'Removed', func:() => {} });
    }})
}

function clearFilters(): void {
    filter.value = {
        keyword: null,
        name: null,
        code: null,
        slug: null,
        isDisabled: null,
    };
}
</script>


<style scoped></style>