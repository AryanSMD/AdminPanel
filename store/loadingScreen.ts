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
        showLoadingScreen(): void {
            this.loadingScreen = true;
        },
        hideLoadingScreen(): void {
            this.loadingScreen = false;
        },
    },
    getters: {
        getLoadingScreen: state => state.loadingScreen,
        getPermission: state => state.permission,
    }
})