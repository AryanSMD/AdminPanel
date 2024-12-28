<template>
    <div class="main-header">
        <div class="left-side">
            <svg class="menu-btn" @click="defaults().setSidebar()" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <div class="dark-theme" @click="defaults().setDarkMode()">
                <div class="btn" :class="[ defaults().getDarkMode ? 'on' : 'off' ]"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg moon" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
            </div>
        </div>
        <div class="right-side">
            <div class="profile">
                <img :src="setProfileImg" class="img" ref="profImg">
                <div class="username">
                    {{ fullName }}
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16"
                @click="showModal()">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg rotate-180" viewBox="0 0 16 16"
                @click="$router.push({ name: 'login' })">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
            </svg>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="profileModal">
            <div class="card !w-[400px] lg:!w-[600px]">
                <div class="header">Profile</div>
                <svg class="close" @click="profileModal = false, getUserLogged()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <div class="profile">
                    <div class="top">
                         <div class="img">
                            <div class="w-full h-full flex justify-center items-center rounded-full overflow-hidden">
                                <img :src="setProfileImg" ref="previewImg">
                            </div>
                            <button class="btn" @click="$refs.chooseFile.click()">
                                <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                </svg>
                            </button>
                        </div>
                        <input type="file" style="display: none;" ref="chooseFile" accept=".jpg, .jpeg"
                            @change="selectImg()"
                        >
                    </div>
                    <VeeForm class="bot" :validation-schema="validation.profile" 
                        v-slot="{ submitCount, errors, handleSubmit }"
                    >
                        <div class="info">
                            <label for="">First Name</label>
                            <VeeInput type="name" name="name" v-model="user.firstName"
                                :class="errors.name && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                        </div>
                        <div class="info">
                            <label for="">Last Name</label>
                            <VeeInput type="name" name="family" v-model="user.lastName"
                                :class="errors.family && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.family }}</div>
                        </div>
                        <div class="info">
                            <label for="">Email</label>
                            <VeeInput type="text" name="email" v-model="user.email" disabled
                                :class="errors.email && submitCount > 0 && 'input-err'"
                            />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.email }}</div>
                        </div>
                        <div class="info">
                            <label for="">BirthDate</label>
                            <VeeInput type="date" name="birthdate" v-model="user.birthDate"
                                :class="errors.birthdate && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.birthdate }}</div>
                        </div>
                        <div class="footer">
                            <button class="btn-save" @click="handleSubmit($event, save)">Save</button>
                        </div>
                    </VeeForm>
                </div>
            </div>
        </div>
    </transition>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const profileModal = ref <boolean> (false);
const chooseFile = ref();
const previewImg = ref();
const profImg = ref();
const fullName = ref <string> ('');
const user = ref <User> ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImageId: '',
    profileImageUrl: '',
    birthDate: '',
    role: 0,
    status: 0,
});


const setProfileImg = computed((): string => {
    if (user.value.profileImageUrl) {
        const url = useRuntimeConfig().public.StorageURL + user.value.profileImageUrl;
        return url;
    } else {
        return defaults().deafultProfImg;
    }
})


async function selectImg(): Promise<void> {
    const file = chooseFile.value.files[0]; 
    // const response = await fileManagementApi().upload({
    //     properties: {
    //         fileName: file.name,
    //         fileType: 0
    //     },
    //     file
    // })

    // if (response.status === 200) {
    //     user.value.birthDate = setTime(user.value.birthDate);
    //     user.value.profileImageId = response.data.id;
    //     user.value.profileImageUrl = response.data.url;
    //     const updateRes = await usersApi().updateUser(user.value);
    //     if (updateRes.status === 200) {
    //         localStorage.setItem('user', JSON.stringify(updateRes.data));
    //         getUserLogged();
    //         previewImg.value.src = setProfileImg.value;
    //         profImg.value.src = setProfileImg.value;
    //     }
    //     user.value.birthDate = getTime(user.value.birthDate);
    // }
}

async function save(): Promise<void> {
    user.value.birthDate = setTime(user.value.birthDate);
    const res = await usersApi().updateUser(user.value);
    if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        getUserLogged();
        profileModal.value = false;
    }
}

function showModal(): void {
    getUserLogged();
    user.value.birthDate = getTime(user.value.birthDate);
    profileModal.value = true;
}

function getUserLogged(): void {
    // const userLogged: User = JSON.parse(localStorage.getItem('user')!);
    // if (userLogged) {
    //     user.value = { ...userLogged };
    //     fullName.value = userLogged.firstName + ' ' + userLogged.lastName;

    // } else {
    //     router.push({ name: 'login' });
    // }
}


onMounted(() => {
    getUserLogged();
})
</script>

<style scoped></style>