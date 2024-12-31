<template>
    <div class="page-error w-full h-screen bg-background !mt-0">
        <div class="error text-text">
            <div class="code !from-red-700 !via-red-600 !to-red-500 animate-pulse">
                {{ props.error.statusCode }}
                <span class="text-[18px] self-end">
                    <svg class="text-red-500 w-[70px] aspect-square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </span>
            </div>
            <div class="msg text-red-800">
                {{ props.error.statusMessage || props.error.message }}
            </div>
            <button class="btn-cancel" @click="$router.push('/')">Home Page</button>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';


const props = defineProps(['error'])
const router = useRouter();


props.error?.statusCode === 404 && router.push({ name: '404-NotFound' });
</script>


<style scoped></style>