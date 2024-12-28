<template>
    <div class="pagination">
        <div class="background">
            <div class="pages">
                <div class="item" @click="previousPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </div>
                <div class="item" v-if="showFirstPage"
                    @click="goToFirstPage()"
                >
                    {{ 1 }}
                </div>
                <div class="item" v-if="showFirstPage">...</div>
                <div 
                    class="item" v-for="page in showingPages"
                    :class="defaults().pagination.currentPage === page && 'active'"
                    @click="defaults().pagination.currentPage = page"
                >
                    {{ page }}
                </div>
                <div class="item" v-if="showLastPage">...</div>
                <div class="item" v-if="showLastPage"
                    @click="goTolastPage()"
                >
                    {{ totalPages }}
                </div>
                <div class="item" @click="nextPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
const props = defineProps({
    numOfData: {
        type: Number,
        required: true
    },
    func: {
        type: Function,
        required: true
    },
});
const startPage = ref <number> (1);


const halfOfVisibleBtns = computed((): number => {
    return Math.floor(defaults().pagination.visibleButtons / 2);
})

const showingPages = computed((): number[] => {
    const range = [];
    for (
        let i = startPage.value;
        i <= Math.min(startPage.value + defaults().pagination.visibleButtons - 1 , totalPages.value); 
        i++
    ) {
        range.push(i);
    }
    return range.length > 0 ? range : [1];
})

const totalPages = computed((): number => {
    return props.numOfData / defaults().pagination.dataPerPage;
})

const showFirstPage = computed((): boolean => {
    return defaults().pagination.currentPage > (halfOfVisibleBtns.value + 1);
})

const showLastPage = computed((): boolean => {
    return defaults().pagination.currentPage < (totalPages.value - halfOfVisibleBtns.value);
})


function nextPage(): void {
    defaults().pagination.currentPage < totalPages.value && defaults().pagination.currentPage++;
}

function previousPage(): void {
    defaults().pagination.currentPage !== 1 && defaults().pagination.currentPage--;
}

function goToFirstPage(): void {
    defaults().pagination.currentPage = 1;
    startPage.value = 1;
}

function goTolastPage(): void {
    defaults().pagination.currentPage = totalPages.value;
    const remainder = defaults().pagination.currentPage % defaults().pagination.visibleButtons;
    startPage.value = remainder !== 0 ? 
        totalPages.value - (remainder - 1) : 
        totalPages.value - ( defaults().pagination.visibleButtons - 1 );
}


watch(
    () => defaults().pagination.currentPage, async (_) => {
        if (defaults().pagination.currentPage > halfOfVisibleBtns.value) {
            startPage.value = defaults().pagination.currentPage - halfOfVisibleBtns.value;
        }

        await props.func();
    }
)
</script>


<style scoped>
.pagination {
    @apply
    w-full h-auto flex justify-center items-center mb-4 mt-8
}

.pagination .background {
    @apply
    flex justify-center items-center bg-background dark:bg-darkBackground p-1 rounded-full
}

.pagination .background .pages {
    @apply
    h-[32px] flex items-center gap-1
}

.pagination .background .pages .item {
    @apply
    w-8 h-8 rounded-full cursor-pointer flex justify-center items-center transition-colors duration-300
    text-text dark:text-white hover:text-primary dark:hover:text-primary
}
.pagination .background .pages .item {
    &.active {
        @apply
        !bg-primary !text-white
    }
}

.pagination .background .pages .item .svg {
    @apply
    w-[15px] aspect-square
}
</style>