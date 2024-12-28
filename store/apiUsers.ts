
interface States {
    users: User[],
    total: number,
}

export const useUsersApi = defineStore('useUsersApi', {
    state: (): States => ({
        users: [],
        total: 0,
    }),
    actions: {
        async Login(body: { email: string, password: string }): Promise<any> {
            try {
                const response = await api().post('Admin', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'welcome', msg: 'Welcome', func: ()=>{} });
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async searchUsers(body: object): Promise<any> {
            try {
                const response = await api().post('AdminUsers/Search', body);
                if (response.status === 200) {
                    this.users = response.data.data;
                    this.total = response.data.total;
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async createUser(body: User): Promise<any> {
            try {
                const response = await api().post('AdminUsers', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'User Created!', func: ()=>{} });
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async updateUser(body: User): Promise<any> {
            try {
                const response = await api().put('AdminUsers', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'User Updated!', func: ()=>{} });
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async removeUser(body: string): Promise<any> {
            try {
                const response = await api().delete(`AdminUsers?id=${ body }`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'User Deleted!', func: ()=>{} });
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async resetPassword(body: string): Promise<any> {
            try {
                const response = await api().post(`AdminUsers/ResetPassword/${ body }`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: "The new password has been sent to the user's email!", func: ()=>{} });
                    return response;
                }

            } catch (err) {
                return err;
            }
        },

        async emailExists(body: string): Promise<any> {
            try {
                loadingScreen().permission = false;
                const isValid: boolean = true;
                if (isValid) {
                    const response = await api().get(`AdminUsers/EmailExists/${ body }`);
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
        },
    },
    getters: {
        getUsers: state => state.users,
        getTotal: state => state.total,
    }
})