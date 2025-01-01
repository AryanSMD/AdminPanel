import { useAlert } from "~/store/alert";
import { useDefaults } from '~/store/defaults';
import { useLoadingScreen } from "~/store/loadingScreen";


export default defineNuxtPlugin(() => {
    return {
        provide: {
            useAlert,
            useDefaults,
            useLoadingScreen,
        },
    }
})