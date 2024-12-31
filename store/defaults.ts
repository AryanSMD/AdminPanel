import defaultImg from '../assets/svg/defaultPic.svg'
import profileImg from '~/public/profile.jpg'
import { users } from '~/constant/users';
import { languages } from '~/constant/languages'
import { courses } from '~/constant/courses'
import { audiences } from '~/constant/audiences'
import { categories } from '~/constant/categories'
import { filename } from 'pathe/utils'


interface States {
    permission: boolean,
    darkMode: boolean,
    openSidebar: boolean,
    users: User[],
    courses: Course[],
    languages: Language[],
    categories: Category[],
    audiences: Audience[],
}

export const useDefaults = defineStore('useDefaults', {
    state: (): States => ({
        permission: true,
        darkMode: false,
        openSidebar: false,
        users: users,
        courses: courses,
        languages: languages,
        categories: categories,
        audiences: audiences,
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
    },
    getters: {
        getPermission: state => state.permission,
        getDarkMode: state => state.darkMode,
        getOpenSidebar: state => state.openSidebar,
        getUsers: state => state.users,
        getCourses: state => state.courses,
        getLanguages: state => state.languages,
        getCategories: state => state.categories,
        getAudiences: state => state.audiences,
        deafultImg: () => defaultImg,
        profileImg: () => profileImg,
    }
})