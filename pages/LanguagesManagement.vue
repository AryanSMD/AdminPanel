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
                    <Icon name="fluent:local-language-zi-24-filled" />
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
                        <tr v-for="language in languages" :key="language.id">
                            <td class="img">
                                <img 
                                    :src="defaults().returnFlagImg(language.slug) ??
                                        defaults().deafultImg" 
                                    ref="profImg"
                                >
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
                <Pagination />
            </div>
        </div>
    </div>
    <Modal 
        :title="'Add Language'" 
        :show="showModal" 
        :validation="validation.addLanguage"
        :save="save"
        :closeModal="closeModal"
    >
        <template v-slot="{ submitCount, errors }">
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
        </template>
    </Modal>
</template>


<script setup lang="ts">
const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const previewImg = ref();
const languages = ref <Language[]> ();
const filter = ref <any> ({
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
    const { name, isDisabled } = filter.value;
    languages.value = defaults().getLanguages.filter(e =>
        name ? e.name.toUpperCase().includes(name.toUpperCase()) : e &&
        isDisabled !== null ? e.isDisabled === isDisabled : e
    )
}

async function save(): Promise<void> {
    alerts().showAlert({ 
        type: 'success', 
        msg: editMode.value ? 'language Updated' : 'language Created',
        func: ()=>{}
    });
    closeModal();
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


languages.value = defaults().getLanguages;
</script>


<style scoped></style>