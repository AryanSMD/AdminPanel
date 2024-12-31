interface States {
    loadingScreen: boolean,
    permission: boolean,
}

export const useLoadingScreen = defineStore('useLoadingScreen', {
    state: (): States => ({
        loadingScreen: false,
        permission: true,
    }),
    actions: {
        show(): void {
            this.loadingScreen = true;
        },
        hide(): void {
            this.loadingScreen = false;
        },
    },
    getters: {
        getLoadingScreen: state => state.loadingScreen,
        getPermission: state => state.permission,
    }
})