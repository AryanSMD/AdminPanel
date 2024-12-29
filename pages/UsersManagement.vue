<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-user head" @click="showModal = true">
            Add User
        </button>
        <div class="box">
            <div class="search-box">
                <div class="top">
                    <select v-model="filter.role">
                        <option :value="null" selected disabled>Select a Role ...</option>
                        <option :value="0">{{ getRole(0) }}</option>
                        <option :value="1">{{ getRole(1) }}</option>
                    </select>
                    <select v-model="filter.status">
                        <option :value="null" selected disabled>Select a Status ...</option>
                        <option :value="0">{{ getStatus(0) }}</option>
                        <option :value="1">{{ getStatus(1) }}</option>
                    </select>
                </div>
                <div class="bottom">
                    <input type="text" placeholder="Search by name ..." v-model="filter.firstName">
                    <button class="btn-search" @click="search()"></button>
                    <button class="btn-reset" @click="clearFilters()"></button>
                </div>
            </div>
            <div class="card">
                <div class="header">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    Users
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
                            <th class="img"></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Birth Date</th>
                            <th>Status</th>
                            <th class="last"></th>
                            <th class="last"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in useApi().getUsers" :key="user.id">
                            <td class="img">
                                <img src="/person1.png" ref="profImg">
                            </td>
                            <td>
                                {{ `${user.firstName} ${user.lastName}` }}
                            </td>
                            <td>{{ user.email }}</td>
                            <td>{{ getRole(user.role) }}</td>
                            <td>{{ getTime(user.birthDate) }}</td>
                            <td>{{ getStatus(user.status) }}</td>
                            <td>
                                <button class="btn-edit" @click="edit(user.id)"></button>
                            </td>
                            <td>
                                <button class="btn-del" @click="removeUser(user.id)"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    :numOfData="useApi().getTotal" 
                    :func="async () => {}"
                />
            </div>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Add User</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="validation.addUser" 
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs">
                            <label>First Name</label>
                            <VeeInput type="text" name="name" v-model="newUser.firstName"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                            <label>Email</label>
                            <VeeInput type="email" name="email" v-model="newUser.email" :disabled="editMode"
                                :class="((errors.email || (emailExists === true)) && submitCount > 0) && 'input-err'"
                            />
                            <div class="label-err" v-if="errors.email && submitCount > 0">{{ errors.email }}</div>
                            <div class="label-err" v-else-if="emailExists === true && submitCount > 0">email exists</div>
                            <label>BirthDate</label>
                            <VeeInput type="date" name="date" v-model="newUser.birthDate"
                                :class="errors.date && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.date }}</div>
                            <button class="btn-save reset-password" 
                                v-if="editMode"
                            >
                                Reset Password
                            </button>
                        </div>
                        <div class="inputs">
                            <label>Last Name</label>
                            <VeeInput type="text" name="family" v-model="newUser.lastName"
                                :class="errors.family && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.family }}</div>
                            <label>Role</label>
                            <VeeInput name="role" as="select" v-model="newUser.role"
                                :class="errors.role && submitCount > 0 && 'input-err'">
                                <option :value="0">{{ getRole(0) }}</option>
                                <option :value="1">{{ getRole(1) }}</option>
                            </VeeInput>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.role }}</div>
                            <label>Status</label>
                            <div class="switch-btn"
                                @click="newUser.status === 0 ? newUser.status = 1 : newUser.status = 0"
                            >
                                <div class="btn" :class="newUser.status ? 'on' : 'off'">
                                    <div class="circle" :class="newUser.status ? 'on' : 'off'"></div>
                                </div>
                                <div class="flex items-center justify-center">
                                    <div class="text" :class="newUser.status && 'off'">Acitve</div>
                                    <div class="text" :class="!newUser.status && 'off'">Deactive</div>
                                </div>
                            </div>
                        </div>
                        <div class="image-container">
                            <div class="image">
                                <img src="/person1.png" class="img" ref="previewImg">
                            </div>
                            <input type="file" style="display: none;" accept=".jpg, .jpeg"
                                ref="chooseFile"
                                @change="selectImg()"
                            >
                            <button class="btn-addImg" @click="$refs.chooseFile.click()">add image</button>
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
const emailExists = ref <boolean|null> (null);
const chooseFile = ref ();
const previewImg = ref ();
const filter = ref({
    firstName: null,
    role: null,
    status: null,
});
const newUser = ref <User> ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
    role: 0,
    status: 0,
});

async function selectImg(): Promise<void> {
    const file = chooseFile.value.files[0]; 

}

async function search(): Promise<void> {
    useApi().getUsers.filter(e => e.firstName === filter.value.firstName)
}

async function save(): Promise<void> {
    console.log('Saved');
    closeModal();
}

function closeModal(): void {
    newUser.value = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        role: 0,
        status: 0,
    };
    editMode.value && (editMode.value = false);
    emailExists.value = null;
    showModal.value = false;
}

function edit(id: string): void {
    const selectedUser = useApi().getUsers.filter(e => e.id === id)[0];
    newUser.value = { ...selectedUser };
    newUser.value.birthDate = getTime(newUser.value.birthDate);
    showModal.value = true;
    editMode.value = true;
}

async function removeUser(id: string): Promise<void> {
    const selectedUser = useApi().getUsers.filter(e => e.id === id)[0];
    const msg = `"${selectedUser.firstName} ${selectedUser.lastName}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        alerts().showAlert({ type:'success', msg: 'Removed', func:() => {} });
    }})
}

function clearFilters(): void {
    filter.value = {
        firstName: null,
        role: null,
        status: null,
    };
}

const debounce = (() => {
    let timeOut: any;
    return () => {
        clearTimeout(timeOut);
        timeOut = setTimeout(async () => {
            if (editMode.value) {
                emailExists.value = false;
            } else {
                const res = await useApi().emailExists(newUser.value.email);
                emailExists.value = res.data;
            }
        }, 300);
    }
})();


watch(
    () => newUser.value.email, async (newVal) => {
        if (newVal !== '') {
            debounce();
        } else {
            emailExists.value = null;
        }
    }, { deep: true }
)
</script>


<style scoped></style>