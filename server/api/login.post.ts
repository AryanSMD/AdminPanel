import { users } from "~/constant/users";

function userExists(val: string): number|null {
    for (let i in users) {
        if (users[i].email === val) {
            return parseInt(i);
        }
    }
    return null;
}

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const userIndex = userExists(body.email);

    if (userIndex === null || users[userIndex].password !== body.password)
        return createError({ 
            statusCode: 404, statusMessage: 'Wrong Email or Password!'
        });

    return users[userIndex];
})