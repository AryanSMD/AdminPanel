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
                @mouseover="!defaults().getOpenSidebar && (isShowGroup[0] = true)"
                @mouseleave="!defaults().getOpenSidebar && (isShowGroup[0] = false)">
                <div class="title" @click="defaults().getOpenSidebar && showGroup(0)"
                    :class="(!defaults().getOpenSidebar && ( isShowGroup[0] ) || ( activeGroupNum == 0 )) && 'active'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                    </svg>
                    <div class="text" v-if="defaults().getOpenSidebar">
                        <div>Managements</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16"
                            :class="isShowGroup[0] && '-rotate-90'">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </div>
                </div>
                <div class="height-auto" :class="((!defaults().getOpenSidebar && isShowGroup[0]) || isShowGroup[0]) && 'show'">
                    <div>
                        <transition name="modal">
                            <div class="group" v-if="defaults().getOpenSidebar ? true : isShowGroup[0]"
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
                                <nuxt-link to="/levelsManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                        Levels
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
                                <nuxt-link to="/domainsManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                                        </svg>
                                        Domains
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
                                <nuxt-link to="/competencesManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                                        </svg>
                                        Competences
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/chaptersManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16m6.5 1.05q1.1-.525 2.213-.787T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2zM12 20q-1.2-.95-2.6-1.475T6.5 18q-1.325 0-2.775.5T1 20.05V5.55Q2.1 4.8 3.588 4.4T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.425 0 2.913.4T23 5.55v14.5Q21.75 19 20.287 18.5T17.5 18q-1.5 0-2.9.525T12 20m2-10.1V8.2q.825-.35 1.688-.525T17.5 7.5q.65 0 1.275.1T20 7.85v1.6q-.6-.225-1.213-.337T17.5 9q-.95 0-1.825.238T14 9.9m0 5.5v-1.7q.825-.35 1.688-.525T17.5 13q.65 0 1.275.1t1.225.25v1.6q-.6-.225-1.213-.338T17.5 14.5q-.95 0-1.825.225T14 15.4m0-2.75v-1.7q.825-.35 1.688-.525t1.812-.175q.65 0 1.275.1T20 10.6v1.6q-.6-.225-1.213-.338T17.5 11.75q-.95 0-1.825.238T14 12.65"/>
                                        </svg>
                                        Chapters
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/subjectsManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h8q.425 0 .713.288T14 18t-.288.713T13 19zm0-4q-.425 0-.712-.288T4 14t.288-.712T5 13h14q.425 0 .713.288T20 14t-.288.713T19 15zm0-4q-.425 0-.712-.288T4 10t.288-.712T5 9h14q.425 0 .713.288T20 10t-.288.713T19 11zm0-4q-.425 0-.712-.288T4 6t.288-.712T5 5h14q.425 0 .713.288T20 6t-.288.713T19 7z"/>
                                        </svg>
                                        Subjects
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/groupsManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 470 470" fill="currentColor">
                                            <path d="m430,65.524h-165c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5 7.5,7.5h165c13.785,0 25,11.215 25,25v8.808c-6.854-5.504-15.546-8.808-25-8.808h-187.5v-32.5c0-22.056-17.944-40-40-40h-162.5c-22.056,0-40,17.944-40,40v356.451c0,4.143 3.357,7.5 7.5,7.5h455c4.143,0 7.5-3.357 7.5-7.5v-323.951c0-22.055-17.944-40-40-40zm25,356.452h-440v-348.952c0-13.785 11.215-25 25-25h162.5c13.785,0 25,11.215 25,25v40c0,4.143 3.357,7.5 7.5,7.5h195c13.785,0 25,11.215 25,25v276.452z"/>
                                            <path d="m337.218,264.864c20.688,0 37.519-16.831 37.519-37.519s-16.831-37.518-37.519-37.518-37.518,16.83-37.518,37.518 16.83,37.519 37.518,37.519zm0-60.036c12.417,0 22.519,10.102 22.519,22.518 0,12.417-10.102,22.519-22.519,22.519-12.416,0-22.518-10.102-22.518-22.519-5.68434e-14-12.416 10.102-22.518 22.518-22.518z"/>
                                            <path d="m337.218,279.864c-10.181,0-20.277,2.528-29.198,7.313-3.65,1.957-5.023,6.503-3.065,10.153 1.957,3.649 6.501,5.026 10.153,3.065 6.749-3.618 14.395-5.531 22.11-5.531 23.313,0 42.708,17.096 46.31,39.407h-46.31c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5 7.5,7.5h54.408c4.143,0 7.5-3.357 7.5-7.5-1.13687e-13-34.135-27.772-61.907-61.908-61.907z"/>
                                            <path d="m133.448,334.271h-46.975c3.602-22.312 22.997-39.407 46.31-39.407 7.715,0 15.359,1.912 22.106,5.529 3.651,1.961 8.198,0.586 10.153-3.065 1.958-3.65 0.585-8.196-3.065-10.153-8.919-4.783-19.015-7.311-29.194-7.311-34.137,0-61.908,27.771-61.908,61.907 0,4.143 3.357,7.5 7.5,7.5h55.074c4.143,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.501-7.5z"/>
                                            <path d="m132.782,264.864c20.688,0 37.518-16.831 37.518-37.519s-16.83-37.518-37.518-37.518-37.519,16.83-37.519,37.518 16.832,37.519 37.519,37.519zm0-60.036c12.416,0 22.518,10.102 22.518,22.518 0,12.417-10.102,22.519-22.518,22.519-12.417,0-22.519-10.102-22.519-22.519 0.001-12.416 10.102-22.518 22.519-22.518z"/>
                                            <path d="m235,267.575c26.636,0 48.306-21.67 48.306-48.306s-21.67-48.306-48.306-48.306-48.306,21.67-48.306,48.306 21.67,48.306 48.306,48.306zm0-81.611c18.365,0 33.306,14.94 33.306,33.306s-14.94,33.306-33.306,33.306-33.306-14.94-33.306-33.306 14.941-33.306 33.306-33.306z"/>
                                            <path d="m235,282.575c-44.917,0-81.46,36.543-81.46,81.461 0,4.143 3.357,7.5 7.5,7.5h147.921c4.143,0 7.5-3.357 7.5-7.5 0-44.918-36.543-81.461-81.461-81.461zm-66.039,73.961c3.735-33.131 31.927-58.961 66.039-58.961s62.305,25.83 66.04,58.961h-132.079z"/>
                                        </svg>
                                        Groups
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
                                <nuxt-link to="/charactersManagement" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg" fill="currentColor">
                                            <path fill="currentColor" d="M9 14.25q-.525 0-.888-.363T7.75 13t.363-.888T9 11.75t.888.363t.362.887t-.363.888T9 14.25m6 0q-.525 0-.888-.363T13.75 13t.363-.888t.887-.362t.888.363t.362.887t-.363.888t-.887.362M12 20q3.35 0 5.675-2.325T20 12q0-.6-.075-1.162T19.65 9.75q-.525.125-1.05.188T17.5 10q-2.275 0-4.3-.975T9.75 6.3q-.8 1.95-2.287 3.388T4 11.85V12q0 3.35 2.325 5.675T12 20m0 2q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                        </svg>
                                        Characters
                                    </div>
                                </nuxt-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="group-link" :class="!defaults().getOpenSidebar && 'close'"
                @mouseover="!defaults().getOpenSidebar && (isShowGroup[1] = true)"
                @mouseleave="!defaults().getOpenSidebar && (isShowGroup[1] = false)">
                <div class="title" @click="defaults().getOpenSidebar && showGroup(1)"
                    :class="(!defaults().getOpenSidebar && ( isShowGroup[1] ) || ( activeGroupNum == 1 )) && 'active'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 12h-5"/>
                        <path d="M15 8h-5"/>
                        <path d="M19 17V5a2 2 0 0 0-2-2H4"/>
                        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>
                    </svg>
                    <div class="text" v-if="defaults().getOpenSidebar">
                        <div>Reports</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16"
                            :class="isShowGroup[1] && '-rotate-90'">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </div>
                </div>
                <div class="height-auto" :class="((!defaults().getOpenSidebar && isShowGroup[1]) || isShowGroup[1]) && 'show'">
                    <div>
                        <transition name="modal">
                            <div class="group" v-if="defaults().getOpenSidebar ? true : isShowGroup[1]"
                                :class="!defaults().getOpenSidebar && 'slide'">
                                <nuxt-link to="/groupsReport" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 32 32">
                                            <path fill="currentColor" d="M11 12a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm-1 6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zM21.83 4A3 3 0 0 0 19 2h-6a3 3 0 0 0-2.83 2H8.5A3.5 3.5 0 0 0 5 7.5v19A3.5 3.5 0 0 0 8.5 30h15a3.5 3.5 0 0 0 3.5-3.5v-19A3.5 3.5 0 0 0 23.5 4zM12 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1M7 7.5A1.5 1.5 0 0 1 8.5 6h1.67A3 3 0 0 0 13 8h6a3 3 0 0 0 2.83-2h1.67A1.5 1.5 0 0 1 25 7.5v19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 7 26.5z"/>
                                        </svg>
                                        Groups
                                    </div>
                                </nuxt-link>
                                <nuxt-link to="/studentsReport" class="link" :class="!defaults().getOpenSidebar && 'close'">
                                    <div class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 32 32">
                                            <path fill="currentColor" d="M11 12a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2zm-1 6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m1 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zM21.83 4A3 3 0 0 0 19 2h-6a3 3 0 0 0-2.83 2H8.5A3.5 3.5 0 0 0 5 7.5v19A3.5 3.5 0 0 0 8.5 30h15a3.5 3.5 0 0 0 3.5-3.5v-19A3.5 3.5 0 0 0 23.5 4zM12 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1M7 7.5A1.5 1.5 0 0 1 8.5 6h1.67A3 3 0 0 0 13 8h6a3 3 0 0 0 2.83-2h1.67A1.5 1.5 0 0 1 25 7.5v19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 7 26.5z"/>
                                        </svg>
                                        Students
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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const activeGroupNum = ref();
const isShowGroup = ref <boolean[]> ([false, false, false]);
const managementPages: string[] = [
    'usersManagement',
    'studentsManagement',
    'levelsManagement',
    'categoriesManagement',
    'domainsManagement',
    'audiencesManagement',
    'competencesManagement',
    'groupsManagement',
    'charactersManagement',
    'chaptersManagement',
    'subjectsManagement',
    'languagesManagement',
];
const reportPages: string[] = [
    'groupsReport',
    'studentsReport',
];


function showGroup(index: number) {
    isShowGroup.value[index] = !isShowGroup.value[index];
}

function checkPath(val: string[]) {
    return val.includes(route.path.split('/')[1]);
}

function setActiveGroupNum() {
    if (checkPath(managementPages)) {
        activeGroupNum.value = 0;
    } else if (checkPath(reportPages)) {
        activeGroupNum.value = 1;
    } else {
        activeGroupNum.value = null;
    }
}


watch(
    () => defaults().getOpenSidebar, (newVal) => {
        if (newVal) {
            for(let i in isShowGroup.value) {
                isShowGroup.value[i] = true;
            }
        } else {
            for(let i in isShowGroup.value) {
                isShowGroup.value[i] = false;
            }
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


<style scoped></style>