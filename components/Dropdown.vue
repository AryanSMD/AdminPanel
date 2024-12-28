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


<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
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


<style scoped></style>