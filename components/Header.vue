<script setup lang="ts">
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
    password: '',
    birthDate: '',
    role: 0,
    status: 0,
});

async function save(): Promise<void> {
    alerts().showAlert({ 
        type: 'success', 
        msg: 'Profile Updated',
        func: ()=>{}
    });
    profileModal.value = false
}

function showModal(): void {
    getUserLogged();
    user.value.birthDate = getTime(user.value.birthDate);
    profileModal.value = true;
}

function getUserLogged(): void {
    const userLogged: User = JSON.parse(localStorage.getItem('user')!);
    if (userLogged) {
        user.value = { ...userLogged };
        fullName.value = userLogged.firstName + ' ' + userLogged.lastName;
    } else {
        router.push({ name: 'login' });
    }
}


onMounted(() => {
    getUserLogged();
})
</script>


<template>
    <div class="header-container">
        <div class="main-header">
            <div class="left-side">
                <ButtonsShowMenu />
                <ButtonsDarkMode />
            </div>
            <div class="right-side">
                <div class="profile">
                    <img :src="defaults().profileImg" class="img" ref="profImg">
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
                                <img :src="defaults().profileImg" ref="previewImg">
                            </div>
                            <button class="btn" @click="$refs.chooseFile.click()">
                                <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                </svg>
                            </button>
                        </div>
                        <input type="file" style="display: none;" ref="chooseFile" accept=".jpg, .jpeg">
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


<style scoped>
.header-container {
    z-index: 100;
    @apply
    w-full sticky top-0 bg-background dark:bg-darkBackground pl-2 lg:pl-1 pr-2 pt-2 transition-colors duration-300 
}

.main-header {
    @apply
    w-full h-[60px] bg-white dark:bg-darkPrimary transition-colors duration-300 flex items-center justify-between 
    px-2 rounded-[10px] overflow-hidden
}

.left-side {
    @apply
    flex w-[80px] sm:w-[100px] h-full items-center justify-between
}

.right-side {
    @apply
    w-auto h-full gap-[2px] sm:gap-2 flex items-center justify-around text-text dark:text-white
}

.right-side .profile {
    @apply
    flex gap-1 items-center cursor-default
}

.right-side .profile .username {
    @apply
    max-w-[70px] sm:max-w-[100px] overflow-hidden truncate md:text-[1.25rem]
}

.right-side .profile .img {
    @apply
    w-8 h-8 rounded-full
}

.right-side .svg {
    @apply
    w-[24px] sm:w-[28px] h-auto aspect-square p-[2px] rounded-md cursor-pointer hover:text-primary transition-colors
    duration-300
}
</style>