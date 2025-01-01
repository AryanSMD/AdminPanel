<script setup lang="ts"></script>


<template>
    <div class="container" data-aos="zoom-in" data-aos-duration="700">
        <div class="page-error">
            <div class="error">
                <div class="code">
                    404
                    <span class="text-[18px] self-end">Oops...!</span>
                </div>
                <div class="msg">
                    Page Not Found!
                </div>
            </div>
        </div>
    </div>
</template>


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
    justify-center items-center bg-gradient-to-r from-secondary to-primary
}

.page-error .error .msg {
    @apply
    text-[1.875rem] my-[10px] italic font-bold
}
</style>