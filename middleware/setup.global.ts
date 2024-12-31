import { users } from "~/constant/users";

export default defineNuxtRouteMiddleware(async(to) => {
    const userLogged: User = JSON.parse(localStorage.getItem('user')!);
    if (to.path !== '/' && to.path !== '/accessdenied') {
        if (!userLogged || (userLogged.firstName !== users[0].firstName))
            return navigateTo('/accessdenied');
    }
})