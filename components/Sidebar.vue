<template>
    <div class="sidebar" :class="!defaults().getOpenSidebar && 'close'">
        <div class="header">
            <!-- <img src="" class="logo"> -->
            <div class="text-white text-center w-full text-[1.2rem] min-[1700px]:text-[1.5rem] font-bold cursor-default transition-all duration-500"
                :class="!defaults().getOpenSidebar && '!text-[1rem] font-medium leading-5'">
                Admin Panel
            </div>
        </div>
        <div class="menu">
            <nuxt-link to="/dashboard" class="link" :class="!defaults().getOpenSidebar && 'close'">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                </svg>
                <div class="text" v-if="defaults().getOpenSidebar">
                    Dashboard
                </div>
            </nuxt-link>
            <nuxt-link to="/courses" class="link" :class="!defaults().getOpenSidebar && 'close'">
                <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
                </svg>
                <div class="text" v-if="defaults().getOpenSidebar">
                    Courses
                </div>
            </nuxt-link>
            <div class="group-link" :class="!defaults().getOpenSidebar && 'close'"
                @mouseover="!defaults().getOpenSidebar && (isShowGroup = true)"
                @mouseleave="!defaults().getOpenSidebar && (isShowGroup = false)">
                <div class="title" @click="defaults().getOpenSidebar && showGroup()"
                    :class="(!defaults().getOpenSidebar && ( isShowGroup ) || ( activeGroupNum == 0 )) && 'active'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                    </svg>
                    <div class="text" v-if="defaults().getOpenSidebar">
                        <div>Managements</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16"
                            :class="isShowGroup && '-rotate-90'">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </div>
                </div>
                <div class="height-auto" :class="((!defaults().getOpenSidebar && isShowGroup) || isShowGroup) && 'show'">
                    <div>
                        <transition name="modal">
                            <div class="group" v-if="defaults().getOpenSidebar ? true : isShowGroup"
                                :class="!defaults().getOpenSidebar && 'slide'">
                                <nuxt-link to="/usersManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                        </svg>
                                        Users
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/studentsManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                                            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                                        </svg>
                                        Students
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/categoriesManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
                                        </svg>
                                        Categories
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/audiencesManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                                            <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                            <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                                        </svg>
                                        Audiences
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/languagesManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg class="svg" fill="currentColor" viewBox="0 0 511.996 511.996" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m511.065 346.918-25.418-68.772c17.262-27.451 26.349-58.971 26.349-91.65 0-95.115-77.382-172.497-172.498-172.497-87.145 0-159.392 64.961-170.89 149h-153.608c-8.284 0-15 6.716-15 15v305c0 5.359 2.859 10.311 7.5 12.99 2.32 1.34 4.91 2.01 7.5 2.01s5.18-.67 7.5-2.01l90.05-51.99h198.45c8.284 0 15-6.716 15-15v-70.531c4.455.346 8.956.526 13.498.526 27.876 0 55.337-6.748 79.87-19.573l72.427 26.768c1.695.627 3.453.931 5.198.931 3.91 0 7.746-1.53 10.609-4.394 4.141-4.142 5.493-10.315 3.463-15.808zm-215.065 67.08h-187.469c-2.633 0-5.22.693-7.5 2.01l-71.031 41.009v-264.02h137.135c.89 23.873 6.65 46.518 16.32 66.973h-17.455v-5.232c0-8.284-6.716-15-15-15s-15 6.716-15 15v5.232h-42.709c-8.284 0-15 6.716-15 15s6.716 15 15 15h69.693l-11.155 13.693-3.085-3.973c-5.081-6.544-14.505-7.728-21.047-2.647-6.543 5.081-7.729 14.505-2.647 21.048l7.333 9.443-30.135 36.99c-5.232 6.423-4.268 15.871 2.155 21.104 2.784 2.269 6.134 3.371 9.465 3.371 4.354 0 8.673-1.887 11.638-5.525l25.76-31.62 16.072 20.697c2.957 3.808 7.383 5.801 11.857 5.801 3.215 0 6.454-1.029 9.189-3.153 6.543-5.081 7.729-14.505 2.647-21.048l-20.32-26.167 29.686-36.438c.411-.505.771-1.034 1.106-1.573h.065c23.101 30.715 56.205 53.496 94.431 63.463v60.562zm158.873-132.579 16.755 45.332-48.281-17.844c-4.184-1.547-8.839-1.15-12.703 1.081-21.524 12.433-46.126 19.005-71.146 19.005-78.574 0-142.498-63.925-142.498-142.498s63.924-142.497 142.498-142.497 142.498 63.924 142.498 142.497c0 29.197-8.774 57.265-25.373 81.168-2.795 4.024-3.449 9.16-1.75 13.756z"/>
                                            <path d="m352.609 107.995c-2.443-5.334-7.771-8.754-13.638-8.754-.001 0-.003 0-.005 0-5.868.002-11.197 3.426-13.637 8.763l-60.76 132.89c-3.445 7.534-.13 16.435 7.404 19.879 7.533 3.445 16.435.129 19.879-7.404l16.459-35.999h61.391l16.659 36.375c2.522 5.508 7.96 8.758 13.647 8.758 2.089-.001 4.213-.439 6.237-1.366 7.532-3.449 10.841-12.352 7.392-19.884zm-30.58 79.374 16.953-37.079 16.982 37.079z"/>
                                        </svg>
                                        Languages
                                    </div>
                                </nuxt-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';


const route = useRoute();
const activeGroupNum = ref();
const isShowGroup = ref <boolean> (false);
const managementPages: string[] = [
    'usersManagement',
    'studentsManagement',
    'categoriesManagement',
    'audiencesManagement',
    'languagesManagement',
];


function showGroup() {
    isShowGroup.value = !isShowGroup.value;
}

function checkPath(val: string[]) {
    return val.includes(route.path.split('/')[1]);
}

function setActiveGroupNum() {
    if (checkPath(managementPages)) {
        isShowGroup.value = true;
    } else {
        isShowGroup.value = false;
    }
}


watch(
    () => defaults().getOpenSidebar, (newVal) => {
        if (newVal) {
            isShowGroup.value = true;
        } else {
            isShowGroup.value = false;
        }
    },
)
watch(
    ()=> route.path, (_) => {
        setActiveGroupNum();
    }
)


setActiveGroupNum();
</script>


<style scoped>
.sidebar {
    @apply
    absolute top-[60px] lg:top-0 w-[250px] lg:relative min-[1700px]:w-[350px] h-full bg-secondary transition-all
    duration-700 overflow-auto z-[100]
}
.sidebar {
    &.close {
        @apply
        w-[0] lg:w-[65px] lg:overflow-visible
    }
}

.sidebar::-webkit-scrollbar {
    @apply
    hidden
}

.sidebar .header {
    @apply
    w-full h-[60px] border-b-[1px] border-white flex items-center overflow-hidden px-2
}

.sidebar .header .logo {
    @apply
    w-[150px] h-full
}

.sidebar .menu {
    @apply
    w-full h-auto flex flex-col gap-2 px-2 py-6 text-white relative mb-10 lg:mb-0
}

.sidebar .menu .link {
    @apply
    flex items-center gap-2 py-1 px-2 rounded-[5px] transition-all duration-300 hover:bg-background
    hover:text-text cursor-pointer
}
.sidebar .menu .link {
    &.close {
        @apply
        justify-center
    }
}

.link-active {
    @apply
    bg-background text-text
}
.link-exact-active {
    @apply
    bg-background text-text
}

.sidebar .menu .link .svg,
.sidebar .menu .group-link .title .svg {
    @apply
    w-[25px] h-[25px]
}

.sidebar .menu .group-link .title .text .svg {
    @apply
    w-[18px] h-[18px]
}

.sidebar .menu .link .text,
.sidebar .menu .group-link .title .text {
    @apply
    w-full text-[1rem] min-[1700px]:text-[1.25rem] flex items-center justify-between
}

.sidebar .menu .group-link {
    @apply
    flex flex-col items-center justify-between rounded-[5px] cursor-pointer relative z-[0]
}

.sidebar .menu .group-link .title {
    @apply
    w-full h-auto flex gap-2 px-2 py-1 transition-all duration-300 hover:bg-background hover:text-text
    rounded-md items-center justify-center
}

.sidebar .menu .group-link .title {
    &.active{
        @apply
        bg-background text-text
    }
}

.sidebar .menu .group-link .group {
    @apply
    w-full px-6 transition-all duration-500 overflow-hidden py-2
}
.sidebar .menu .group-link .group {
    &.slide {
        @apply
        absolute !w-[250px] !h-auto top-0 right-[-250px] overflow-hidden p-4 rounded-r-md
        bg-secondary
    } 
}

.sidebar .menu .group-link .group .link {
    @apply
    mb-2
}
.sidebar .menu .group-link .group .link:last-child {
    @apply
    mb-0
}

.sidebar .menu .group-link .group .link .text {
    @apply
    justify-start gap-2 text-[.9rem] min-[1700px]:text-[1.1875rem]
}

.sidebar .menu .group-link .group .link .text .svg {
    @apply
    w-[20px] h-[20px]
}

.sidebar .menu .group-link .title .text .svg {
    @apply
    transition-transform duration-500 
}
</style>