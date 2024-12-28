<template>
    <div class="login-container" data-aos="fade-in" data-aos-duration="700">
        <div class="login-card">
            <div class="header">
                Login
                <span class="text">Sign in to start your session</span>
            </div>
            <div class="content">
                <VeeForm @submit="save" :validation-schema="validation.login" v-slot="{ submitCount, errors }">
                    <div class="username":class="errors.name && submitCount > 0 && 'input-err'">
                        <VeeInput type="text" name="name" class="username" v-model="name" required />
                        <label>Username</label>
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </div>
                    <div class="label-err" v-if="submitCount > 0">{{ errors.name }}</div>
                    <div class="password mt-4 md:mt-5" :class="errors.password && submitCount > 0 && 'input-err'">
                        <VeeInput type="password" name="password" class="password" v-model="password" required />
                        <label>Password</label>
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                    <div class="label-err" v-if="submitCount > 0">{{ errors.password }}</div>
                    <div class="footer">
                        <button class="btn">login</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const name = ref <string> ('');
const password = ref <string> ('');


async function save(): Promise<void> {
    // const res = await usersApi().Login({ 
    //     email: name.value, 
    //     password: password.value 
    // });
    // res.status === 200 && router.push('/dashboard');
    router.push('/dashboard');
}


onMounted(async () => {
    localStorage.clear();
})
</script>


<style scoped></style>