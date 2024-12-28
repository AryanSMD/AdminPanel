import { useDefaults } from "~/store/defaults";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const defaults = useDefaults();
    if (to.path == '/dashboard' && !defaults.getPermission) {
        // return abortNavigation();
        return navigateTo('/accessdenied');
    }
    // console.log(from)
    // console.log(to)
})