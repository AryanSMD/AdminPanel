<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const props = defineProps<Props>();
const emit = defineEmits(['valueEmit']);
const show = ref <boolean> (false);
const searchText = ref <string> ('');
const selected = ref <string|null> (null);
const dropdown = ref(null);

const filteredList = computed(() => {
    return props.list.filter(e => e[props.listValue].toUpperCase().includes(searchText.value.toUpperCase()));
})

function select(key: any, value: string): void {
    emit('valueEmit', key);
    selected.value = value;
    closeDropdown();
}

function closeDropdown(): void {
    searchText.value = '';
    show.value = false;
}

onMounted(() => {
    props.valueProp &&
        ( selected.value = props.list.filter(e => e.id === props.valueProp)[0][props.listValue] );
})

watch(
    () => props.valueProp, (newVal) => {
        newVal === null && ( selected.value = null );
    }
)

onClickOutside(dropdown, _ => closeDropdown());
interface Props {
    placeHolder: string,
    valueProp: any,
    list: any[],
    listKey: string,
    listValue: string,
}
</script>


<template>
    <div class="dropdown" ref="dropdown">
        <div class="selected" @click="show = !show, searchText = ''"
            :class="show && 'focus'"
        >
            {{ selected ?? props.placeHolder }}
        </div>
        <transition name="modal">
            <div class="search-list">
                <input type="text" placeholder="Search ..." v-model="searchText">
                <div
                    v-for="item in filteredList"
                    :key="item[props.listKey]"
                    @click="select(item[props.listKey], item[props.listValue])"
                >
                    {{ item[props.listValue] }}
                </div>
            </div>
        </transition>
    </div>
</template>


<style scoped>
.dropdown {
    @apply
    w-full relative
}

.dropdown .selected {
    background: url('../assets/svg/arrowDown.svg') 99.2% no-repeat;
    @apply
    w-full h-10 md:h-12 border-[1px] border-paleGrey rounded-[5px] cursor-pointer outline-none p-2
    focus:border-primary dark:border-text dark:focus:border-primary dark:focus:text-grey flex items-center
    bg-white dark:bg-darkPrimary transition-colors duration-300 text-text dark:text-white
}
.dropdown .selected.focus {
    @apply
    !border-primary
}

.dropdown.input-err .selected {
    @apply
    border-red-400
}

.dropdown .search-list {
    border: 1px solid rgb(0, 0, 0, .6);
    box-shadow: 1px 1px 10px rgb(0, 0, 0, .2),
        -1px -1px 10px rgb(0, 0, 0, .2);
    @apply
    absolute w-full max-h-[300px] rounded-[4px] left-0 mt-[2px] 2xl:mt-1 z-[100] bg-white dark:bg-darkPrimary 
    overflow-hidden dark:text-white dark:border-slate-500 hidden overflow-y-auto
}

.dropdown .selected.focus ~ .search-list {
    @apply
    block
}

.dropdown .search-list input {
    @apply
    w-full border-none rounded-none px-[10px] h-auto placeholder:text-text dark:placeholder:text-white
    mb-0
}

.dropdown .search-list div {
    @apply
    py-[3px] px-[10px] cursor-pointer hover:bg-secondary hover:text-white
}
</style>