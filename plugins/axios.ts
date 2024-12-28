import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin(() => {
    const api: AxiosInstance = axios.create({
        baseURL: '/api',
    })

    api.interceptors.request.use(config => {
        loadingScreen().showLoadingScreen();

        return config;
    }, error => {
        loadingScreen().hideLoadingScreen();
        alerts().showAlert({ 
            type:'error',
            msg:'Session Expired!',
            func: ()=>{} 
        });

        return Promise.reject(error);
    })

    api.interceptors.response.use(response => {
        if (response.status == 200) {
            loadingScreen().hideLoadingScreen();

            return Promise.resolve(response);
        } else {
            loadingScreen().hideLoadingScreen();

            return Promise.resolve(response);
        }
    }, error => {
        loadingScreen().hideLoadingScreen();
        alerts().showAlert({
            type:'error',
            msg:'An error occurred. please try again later!',
            func: ()=>{} 
        });
        
        if (error.response.status == 404) {
            return Promise.resolve(error);
        }
    })

    return {
        provide: { api },
    }
})