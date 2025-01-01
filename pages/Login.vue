<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref <string> ('');
const password = ref <string> ('');

async function save(): Promise<void> {
    const res = await useApi().Login({ 
        email: email.value, 
        password: password.value 
    });
    res.status === 200 && router.push('/dashboard');
}

onMounted(async () => {
    localStorage.clear();
})
</script>


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
                        <VeeInput type="text" name="name" class="username" v-model="email" required />
                        <label>Email</label>
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
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


<style scoped>
.wrapper .login-container {
    @apply
    w-full h-full flex justify-center items-center
}

.wrapper .login-container .login-card {
    @apply
    w-[90%] md:w-[60%] lg:w-[600px] min-[1700px]:w-[650px] h-auto bg-white rounded-[5px]
    shadow-lg dark:bg-darkPrimary
}

.wrapper .login-container .login-card .header {
    @apply
    w-full p-2 text-center text-[1.3rem] md:text-[1.7rem] min-[1700px]:text-[1.875rem] text-primary font-medium 
    border-b-[1px] border-paleGrey dark:border-text cursor-default
}

.wrapper .login-container .login-card .header .text {
    @apply
    block text-grey text-[1rem] min-[1700px]:text-[1.125rem] font-light
}

.wrapper .login-container .login-card .content {
    @apply
    w-full p-4 mt-[20px] lg:mt-[40px]
}

.wrapper .login-container .login-card .content input {
    @apply
    border-none md:text-[1.15rem] min-[1700px]:text-[1.25rem] rounded-sm
}
.wrapper .login-container .login-card .content input:-webkit-autofill {
    transition: background-color 1000000s;
    -webkit-text-fill-color: var(--grey) !important;
}

.wrapper .login-container .login-card .content .username,
.wrapper .login-container .login-card .content .password {
    @apply
    flex gap-2 items-center mb-1 border-b-[1px] dark:border-grey transition-colors duration-300 relative
}
.wrapper .login-container .login-card .content .username,
.wrapper .login-container .login-card .content .password {
    &.input-err {
        @apply
        border-red-400
    }
}

.wrapper .login-container .login-card .content .username label,
.wrapper .login-container .login-card .content .password label {
    @apply
    absolute top-[50%] translate-y-[-50%] left-[5px] z-[1] pointer-events-none text-grey font-normal px-2
    transition-all duration-300 md:text-[1.15rem] min-[1700px]:text-[1.25rem] h-min
}
.wrapper .login-container .login-card .content .username input:focus~label,
.wrapper .login-container .login-card .content .username input:valid~label,
.wrapper .login-container .login-card .content .username input:autofill~label,
.wrapper .login-container .login-card .content .password input:focus~label,
.wrapper .login-container .login-card .content .password input:autofill~label,
.wrapper .login-container .login-card .content .password input:valid~label {
    @apply
    !top-[-2px] left-0 text-[.6rem] md:text-[1rem] min-[1700px]:text-[1rem]
}

.wrapper .login-container .login-card .content .username .svg,
.wrapper .login-container .login-card .content .password .svg {
    @apply
    w-[35px] h-[35px] text-grey z-[2]
}

.wrapper .login-container .login-card .content .footer {
    @apply
    flex justify-center items-center mt-[40px] md:mt-[60px] mb-[10px]
}

.wrapper .login-container .login-card .content .footer .btn {
    @apply
    bg-primary w-full h-[40px] text-white p-2 rounded-md hover:bg-secondary transition-all duration-300
    lg:h-[46px] lg:text-[1.25rem] min-[1700px]:text-[1.375rem]
}
</style>