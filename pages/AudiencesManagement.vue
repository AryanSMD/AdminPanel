<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-add head" @click="showModal = true">
            Add Audience
        </button>
        <div class="box">
            <div class="search-box">
                <div class="top">
                    <select v-model="filter.isDisabled">
                        <option :value="null" disabled>Select Status...</option>
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
                        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                    </svg>
                    Audiences
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
                        <tr v-for="audience in audiencesApi().getAudiences" :key="audience.id">
                            <td>
                                {{ audience.name }}
                            </td>
                            <td colspan="5">
                                <p v-html="audience.description" class="description"></p>
                            </td>
                            <td>
                                {{ audience.isDisabled ? 'Deactive' : 'Active' }}
                            </td>
                            <td>
                                <button class="btn-edit" @click="edit(audience.id)"></button>
                            </td>
                            <td>
                                <button class="btn-del" @click="removeAudience(audience.id)"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    :numOfData="audiencesApi().getTotal"
                    :func="async () => await getAudiences()"
                />
            </div>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Add Audience</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="validation.addAudience"
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs col-span-3">
                            <label>Name</label>
                            <VeeInput type="text" name="name" v-model="newAudience.name"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                        </div>
                        <div class="inputs xl:col-span-3">
                            <label>Description</label>
                            <Editor
                                api-key="frlocmhn1q09gpla4ewouv1mf9z6bu5vqwdgetmy0ompbjb6"
                                :init="defaults().getTinyConfig"
                                v-model="newAudience.description"
                            />
                        </div>
                        <div class="inputs col-span-3 mt-5">
                            <label>Status</label>
                            <div class="switch-btn"
                                @click="newAudience.isDisabled = !newAudience.isDisabled"
                            >
                                <div class="btn" :class="newAudience.isDisabled ? 'on' : 'off'">
                                    <div class="circle" :class="newAudience.isDisabled ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newAudience.isDisabled && 'off'">Acitve</div>
                                    <div class="text" :class="!newAudience.isDisabled && 'off'">Deactive</div>
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
const searchMode = ref <boolean> (false);
const filter = ref({
    name: null,
    isDisabled: null,
})
const newAudience = ref <Audience> ({
    id: '',
    name: '',
    description: '',
    isDisabled: false,
})


async function getAudiences(): Promise<void> {
    if (!searchMode.value) {
        await audiencesApi().searchAudiences({
            page: defaults().pagination.currentPage,
            pageSize: defaults().pagination.dataPerPage 
        });
    }
}

async function search(): Promise<void> {
    searchMode.value = true;
    defaults().resetPagination();
    await audiencesApi().searchAudiences({
        page: defaults().pagination.currentPage,
        pageSize: defaults().pagination.dataPerPage,
        ...filter.value,
    });
    searchMode.value = false;
}

async function save(): Promise<void> {
    if (editMode.value) {
        const res = await audiencesApi().updateAudience(newAudience.value);
        if (res.status === 200) {
            await getAudiences();
            closeModal();
        }

    } else {
        const res = await audiencesApi().createAudience(newAudience.value);
        if (res.status === 200) {
            await getAudiences();
            closeModal();
        }
    }
}

function edit(id: string): void {
    const selectedAudience = audiencesApi().getAudiences.filter(e => e.id === id)[0];
    newAudience.value = { ...selectedAudience };
    showModal.value = true;
    editMode.value = true;
}

function closeModal(): void {
    newAudience.value = {
        id: '',
        name: '',
        description: '',
        isDisabled: false,
    };
    editMode.value && (editMode.value = false);
    showModal.value = false;
}

async function removeAudience(id: string): Promise<void> {
    const selectedAudience = audiencesApi().getAudiences.filter(e => e.id === id)[0];
    const msg = `"${selectedAudience.name}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        await audiencesApi().removeAudience(id);
        await getAudiences();
    }})
}

function clearFilters(): void {
    filter.value = {
        name: null,
        isDisabled: null,
    };
}


onBeforeMount(async () => {
    defaults().resetPagination();
    await getAudiences();
})
</script>


<style scoped></style>