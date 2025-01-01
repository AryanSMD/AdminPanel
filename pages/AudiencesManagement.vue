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
                    <Icon name="fluent:people-audience-20-filled" />
                    Audiences
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
                        <tr v-for="audience in audiences" :key="audience.id">
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
                <Pagination />
            </div>
        </div>
    </div>
    <Modal 
        :title="'Add Audience'" 
        :show="showModal" 
        :validation="validation.addAudience"
        :save="save"
        :closeModal="closeModal"
    >
        <template v-slot="{ submitCount, errors }">
            <div class="form">
                <div class="inputs col-span-3">
                    <label>Name</label>
                    <VeeInput type="text" name="name" v-model="newAudience.name"
                        :class="errors.name && submitCount > 0 && 'input-err'" />
                    <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                </div>
                <div class="inputs xl:col-span-3">
                    <label>Description</label>
                    <textarea>{{ newAudience.description }}</textarea>

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
        </template>
    </Modal>
</template>


<script setup lang="ts">
const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const audiences = ref <Audience[]> ();
const filter = ref <any> ({
    name: null,
    isDisabled: null,
})
const newAudience = ref <Audience> ({
    id: '',
    name: '',
    description: '',
    isDisabled: false,
})

async function search(): Promise<void> {
    const { name, isDisabled } = filter.value;
    audiences.value = defaults().getAudiences.filter(e =>
        name ? e.name.toUpperCase().includes(name.toUpperCase()) : e &&
        isDisabled !== null ? e.isDisabled === isDisabled : e
    )
}

async function save(): Promise<void> {
    alerts().showAlert({ 
        type: 'success', 
        msg: editMode.value ? 'Audience Updated' : 'Audience Created',
        func: ()=>{}
    });
    closeModal();
}

function edit(id: string): void {
    const selectedAudience = defaults().getAudiences.filter(e => e.id === id)[0];
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
    const selectedAudience = defaults().getAudiences.filter(e => e.id === id)[0];
    const msg = `"${selectedAudience.name}"`;
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

audiences.value = defaults().getAudiences;
</script>


<style scoped></style>