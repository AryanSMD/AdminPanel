<script setup lang="ts">
const props = defineProps<{
    title: string,
    show: boolean,
    validation: object,
    save: any,
    closeModal: Function,
}>();
</script>


<template>
    <transition name="modal">
        <div class="modal" v-if="props.show">
            <div class="card">
                <div class="header">{{ props.title }}</div>
                <svg class="close" @click="props.closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm 
                    as="div" 
                    :validation-schema="props.validation"
                    v-slot="{ submitCount, errors, handleSubmit }"
                >
                    <slot :submitCount="submitCount" :errors="errors" />
                    <div class="footer">
                        <button class="btn-cancel" @click="props.closeModal()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, props.save)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </transition>
</template>


<style scoped></style>