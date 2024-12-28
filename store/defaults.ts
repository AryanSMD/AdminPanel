import userDefaultImg from '../assets/svg/userProfile.svg'
import defaultImg from '../assets/svg/defaultPic.svg'
import { filename } from 'pathe/utils'


interface States {
    permission: boolean,
    darkMode: boolean,
    openSidebar: boolean,
    editorSkin: string|null,
    editorCss: string|null,
    courses: Course[],
    students: Student[],
    languages: Language[],
    categories: Category[],
    audiences: Audience[],
    pagination: {
        currentPage: number,
        dataPerPage: number,
        visibleButtons: number,
    },
}

export const useDefaults = defineStore('useDefaults', {
    state: (): States => ({
        permission: true,
        darkMode: false,
        openSidebar: false,
        editorSkin: null,
        editorCss: null,
        courses: [],
        students: [],
        languages: [],
        categories: [],
        audiences: [],
        pagination: {
            currentPage: 1,
            dataPerPage: 10,
            visibleButtons: 5,
        },
    }),
    actions: {
        setDarkMode(): void {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode.toString());
        },

        defaultDarkMode(): void {
            const isDarkMode: string|null = localStorage.getItem('openSidebar');
            typeof isDarkMode === 'string' ?
                this.darkMode = (localStorage?.getItem('darkMode') === 'true') : null;
        },

        setSidebar(): void {
            this.openSidebar = !this.openSidebar;
            localStorage.setItem('openSidebar', this.openSidebar.toString());
        },

        defaultSidebar(): void {
            const isOpenSidebar: string|null = localStorage.getItem('openSidebar');
            typeof isOpenSidebar === 'string' ?
                this.openSidebar = (localStorage?.getItem('openSidebar') === 'true') : null;
        },

        returnFlagImg(val: string): string {
            const glob = import.meta.glob('../assets/svg/flags/*.svg', { eager: true })
            const images = Object.fromEntries(
                Object.entries(glob).map(([key, value]) => [filename(key), (value as any).default])
            )
            return images[`${val}`];
        },

        resetPagination(): void {
            this.pagination.currentPage = 1;
        }
    },
    getters: {
        getPermission: state => state.permission,
        getDarkMode: state => state.darkMode,
        getOpenSidebar: state => state.openSidebar,
        getPagination: state => state.pagination,
        getCourses: state => state.courses,
        totalCourses: state => state.courses.length,
        getStudents: state => state.students,
        totalStudents: state => state.students.length,
        getLanguages: state => state.languages,
        totalLanguages: state => state.languages.length,
        getCategories: state => state.categories,
        totalCategories: state => state.categories.length,
        getAudiences: state => state.audiences,
        totalAudiences: state => state.audiences.length,
        deafultProfImg: () => userDefaultImg,
        deafultImg: () => defaultImg,
        getTinyConfig: state => {
            const tinyConfig: object = {
                selector: '#tiny',
                height: 214,
                plugins: [
                    'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks code fullscreen insertdatetime media nonbreaking',
                    'table emoticons template paste help'
                ],
                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                    'forecolor backcolor emoticons | help',
                menubar: false,
                resize: false,
                statusbar: false,
                skin: state.editorSkin,
                content_css: state.editorCss,
            }
            if (state.darkMode) {
                state.editorSkin = "oxide-dark";
                state.editorCss = "dark";
            } else {
                state.editorSkin = null;
                state.editorCss = null;
            }
            return  tinyConfig
        },
    }
})