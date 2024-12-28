import { users } from "~/constant/users";

function emailExists(val: string): boolean {
    for (let i in users) {
        if (users[i].email === val) {
            return true;
        }
    }
    return false;
}

export default defineEventHandler(async event => {
    const body = await readBody(event);
    return emailExists(body.email);
})