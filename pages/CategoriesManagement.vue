<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-add head" @click="showModal = true">
            Add Category
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                    </svg>
                    Categories
                </div>
                <div class="import-file">
                    <input type="file" ref="importFile" accept=".csv, .pdf">
                    <button @click="$refs.importFile.click()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg">
                            <path d="M12 13v8"/>
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                            <path d="m8 17 4-4 4 4"/>
                        </svg>
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th colspan="5">Description</th>
                            <th>Status</th>
                            <th class="last"></th>
                            <th class="last"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in defaults().getCategories" :key="category.id">
                            <td>
                                {{ category.name }}
                            </td>
                            <td colspan="5">
                                <p v-html="category.description" class="description"></p>
                            </td>
                            <td>
                                {{ category.isDisabled ? 'Deactive' : 'Active' }}
                            </td>
                            <td>
                                <button class="btn-edit" @click="edit(category.id)"></button>
                            </td>
                            <td>
                                <button class="btn-del" @click="removeCategory(category.id)"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    :numOfData="defaults().totalCategories"
                    :func="async () => {}"
                />
            </div>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Add Category</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="validation.addCategory"
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs col-span-3">
                            <label>Name</label>
                            <VeeInput type="text" name="name" v-model="newCategory.name"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                        </div>
                        <div class="inputs xl:col-span-3">
                            <label>Description</label>
                            <Editor
                                api-key="frlocmhn1q09gpla4ewouv1mf9z6bu5vqwdgetmy0ompbjb6"
                                :init="defaults().getTinyConfig"
                                v-model="newCategory.description"
                            />
                        </div>
                        <div class="inputs col-span-3 mt-5">
                            <label>Status</label>
                            <div class="switch-btn"
                                @click="newCategory.isDisabled = !newCategory.isDisabled"
                            >
                                <div class="btn" :class="newCategory.isDisabled ? 'on' : 'off'">
                                    <div class="circle" :class="newCategory.isDisabled ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newCategory.isDisabled && 'off'">Acitve</div>
                                    <div class="text" :class="!newCategory.isDisabled && 'off'">Deactive</div>
                                </div>
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
import Editor from '@tinymce/tinymce-vue'


const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const filter = ref({
    name: null,
    isDisabled: null,
})
const newCategory = ref <Category> ({
    id: '',
    name: '',
    description: '',
    isDisabled: false,
})


async function search(): Promise<void> {
}

async function save(): Promise<void> {

}

function edit(id: string): void {
    const selectedCategory = defaults().getCategories.filter(e => e.id === id)[0];
    newCategory.value = { ...selectedCategory };
    showModal.value = true;
    editMode.value = true;
}

function closeModal(): void {
    newCategory.value = {
        id: '',
        name: '',
        description: '',
        isDisabled: false,
    };
    editMode.value && (editMode.value = false);
    showModal.value = false;
}

async function removeCategory(id: string): Promise<void> {
    const selectedCategory = defaults().getCategories.filter(e => e.id === id)[0];
    const msg = `"${selectedCategory.name}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        alerts().showAlert({ type:'success', msg: 'Removed', func:() => {} });
    }})
}

function clearFilters(): void {
    filter.value = {
        name: null,
        isDisabled: null,
    };
}
</script>


<style scoped></style>