import { useApi } from "~/store/api";
import { useAlert } from "~/store/alert";
import { useDefaults } from '~/store/defaults';
import { useLoadingScreen } from "~/store/loadingScreen";


export default defineNuxtPlugin(() => {
    return {
        provide: {
            useApi,
            useAlert,
            useDefaults,
            useLoadingScreen,
        },
    }
})