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
                    <Icon name="iconamoon:category-fill" />
                    Categories
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
                        <tr v-for="category in categories" :key="category.id">
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
                <Pagination />
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
                            <textarea>{{ newCategory.description }}</textarea>
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
const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const categories = ref <Category[]> ();
const filter = ref <any> ({
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
    const { name, isDisabled } = filter.value;
    categories.value = defaults().getCategories.filter(e =>
        name ? e.name.toUpperCase().includes(name.toUpperCase()) : e &&
        isDisabled !== null ? e.isDisabled === isDisabled : e
    )
}

async function save(): Promise<void> {
    alerts().showAlert({ 
        type: 'success', 
        msg: editMode.value ? 'Category Updated' : 'Category Created',
        func: ()=>{}
    });
    closeModal();
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


categories.value = defaults().getCategories;
</script>


<style scoped></style>