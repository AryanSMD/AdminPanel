import userDefaultImg from '../assets/svg/userProfile.svg'
import defaultImg from '../assets/svg/defaultPic.svg'
import { filename } from 'pathe/utils'


interface States {
    permission: boolean,
    darkMode: boolean,
    openSidebar: boolean,
    editorSkin: string|null,
    editorCss: string|null,
    tooltips: object,
    pagination: {
        currentPage: number,
        dataPerPage: number,
        visibleButtons: number,
    },
    optionsTypes: {
        key: string,
        value: string,
        description: string,
        blocksTypes: string[]
    }[],
}

export const useDefaults = defineStore('useDefaults', {
    state: (): States => ({
        permission: true,
        darkMode: false,
        openSidebar: false,
        editorSkin: null,
        editorCss: null,
        pagination: {
            currentPage: 1,
            dataPerPage: 10,
            visibleButtons: 5,
        },
        optionsTypes: [
            {
                key: 'lesson',
                value: 'Lesson',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Video',
                    'Picture',
                ]
            },
            {
                key: 'audio',
                value: 'Audio',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                ]
            },
            {
                key: 'video',
                value: 'Video',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Video',
                ]
            },
            {
                key: 'test',
                value: 'Test',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                ]
            },
            {
                key: 'multipleChoice',
                value: 'Multiple Choice',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Multiple Choice T1',
                    'Multiple Choice T2',
                    'Multiple Choice T3',
                    'Multiple Choice T4',
                ]
            },
            {
                key: 'trueOrFalse',
                value: 'True Or False',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'True Or False',
                ]
            },
            {
                key: 'sentenceMaking',
                value: 'Sentence Making',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Sentence Making T1',
                    'Sentence Making T2',
                ]
            },
            {
                key: 'blankQuestion',
                value: 'Blank Question',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Blank Question T1',
                    'Blank Question T2',
                    'Blank Question T3',
                    'Blank Question T4',
                ]
            },
            {
                key: 'connectQuestion',
                value: 'Connect Question',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Connect Question T1',
                    'Connect Question T2',
                ]
            },
            {
                key: 'conversation',
                value: 'Conversation',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Conversation',
                ]
            },
            {
                key: 'descriptive',
                value: 'Descriptive',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [
                    'Description',
                    'Audio',
                    'Question',
                ]
            },
            {
                key: 'soundRecognition',
                value: 'Sound Recognition',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [

                ]
            },
            {
                key: 'recommenderSystem',
                value: 'Recommender System',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, veritatis.',
                blocksTypes: [

                ]
            },
        ],
        tooltips: {
            addQuestion: [
                {
                    title: 'description',
                    text: 'Please fill in the fields'
                },
                {
                    title: 'multipleChoice',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'trueOrFalse',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'sentenceMaking',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'blankQuestion',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'connectQuestion',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'conversation',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
                {
                    title: 'descriptive',
                    text: 'Enter sentence and translated sentence then connect words and translated words with drag and drop'
                },
            ],
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
        getTooltips: state => state.tooltips,
        getOptionsTypes: state => state.optionsTypes,
        getPagination: state => state.pagination,
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