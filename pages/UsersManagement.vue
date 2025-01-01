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
                    <Icon name="fluent:people-community-12-filled" />
                    Users
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
                        <tr v-for="user in users" :key="user.id">
                            <td class="img">
                                <img :src="defaults().profileImg" ref="profImg">
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
                <Pagination />
            </div>
        </div>
    </div>
    <Modal 
        :title="'Add User'" 
        :show="showModal" 
        :validation="validation.addUser"
        :save="save"
        :closeModal="closeModal"
    >
        <template v-slot="{ submitCount, errors }">
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
                        <img :src="newUser.id && defaults().profileImg" class="img" ref="previewImg">
                    </div>
                    <input type="file" style="display: none;" accept=".jpg, .jpeg" ref="chooseFile">
                    <button class="btn-addImg" @click="$refs.chooseFile.click()">add image</button>
                </div>
            </div>
        </template>
    </Modal>
</template>


<script setup lang="ts">
const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const emailExists = ref <boolean|null> (null);
const chooseFile = ref ();
const previewImg = ref ();
const users = ref <User[]> ();
const filter = ref <any> ({
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


async function search(): Promise<void> {
    const { firstName, role, status } = filter.value;
    users.value = defaults().getUsers.filter(e =>
        firstName ? e.firstName.toUpperCase().includes(firstName.toUpperCase()) : e &&
        role ? e.role === role : e &&
        status ? e.status === status : e
    )
}

async function save(): Promise<void> {
    alerts().showAlert({ 
        type: 'success', 
        msg: editMode.value ? 'User Updated' : 'User Created',
        func: ()=>{}
    })
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
    const selectedUser = defaults().getUsers.filter(e => e.id === id)[0];
    newUser.value = { ...selectedUser };
    newUser.value.birthDate = getTime(newUser.value.birthDate);
    showModal.value = true;
    editMode.value = true;
}

async function removeUser(id: string): Promise<void> {
    const selectedUser = defaults().getUsers.filter(e => e.id === id)[0];
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


users.value = defaults().getUsers;
</script>


<style scoped></style>