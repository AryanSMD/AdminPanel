interface States {
    languages: Language[],
    total: number,
}

export const useLanguagesApi = defineStore('useLanguagesApi', {
    state: (): States => ({
        languages: [],
        total: 0,
    }),
    actions: {
        async searchLanguages(body: object): Promise<any> {
            try {
                const response = await api().post('Languages/Search', body);
                if (response.status === 200) {
                    this.languages = response.data.data;
                    this.total = response.data.total;

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async createLanguage(body: Language): Promise<any> {
            try {
                const response = await api().post('Languages', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Language Created!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async updateLanguage(body: Language): Promise<any> {
            try {
                const response = await api().put('Languages', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Language Updated!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async removeLanguage(body: string): Promise<any> {
            try {
                const response = await api().delete(`Languages?id=${body}`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Language Deleted!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },
    },
    getters: {
        getLanguages: state => state.languages,
        getTotal: state => state.total,
    }
})