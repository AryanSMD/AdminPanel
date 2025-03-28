import * as yup from 'yup';

const api = () => useNuxtApp().$api;

export async function loginApi(body: { email: string, password: string }): Promise<any> {
    try {
        const response = await api().post('/login', body);
        if (response.status === 200) {
            alerts().showAlert({ type: 'welcome', msg: 'Welcome', func: ()=>{} });
            localStorage.setItem('user', JSON.stringify(response.data));
            return response;
        }

    } catch (err) {
        return err;
    }
}

export async function emailExistsApi(body: string): Promise<any> {
    try {
        loadingScreen().permission = false;
        const isValid: boolean = await yup.string().email().defined().isValid(body);
        if (isValid) {
            const response = await api().post('/emailExists', { email: body });
            if (response.status === 200) {
                return response;
            }
        }
        return { data: { exists: null } };

    } catch (err) {
        return err;

    } finally {
        loadingScreen().permission = true;
    }
}