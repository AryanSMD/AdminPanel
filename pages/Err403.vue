<template>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
        <div class="page-error">
            <div class="error">
                <div class="code">
                    403
                    <span class="text-[18px] self-end">Oops...!</span>
                </div>
                <div class="msg">
                    Access Denied!
                </div>
                <button class="btn-cancel" @click="$router.push('/')">Home Page</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-error {
    @apply
    w-full mt-[300px] flex justify-center items-center
}

.page-error .error {
    @apply
    text-center flex flex-col items-center cursor-default
}

.page-error .error .code {
    @apply
    text-[10rem] md:text-[12.5rem] font-bold h-[180px] bg-clip-text text-transparent flex 
    justify-center items-center bg-gradient-to-r from-red-600 to-red-800
}

.page-error .error .msg {
    @apply
    text-[1.875rem] my-[10px] italic font-bold
}
</style>