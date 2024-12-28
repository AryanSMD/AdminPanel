interface States {
    audiences: Audience[],
    total: number,
}

export const useAudiencesApi = defineStore('useAudiencesApi', {
    state: (): States => ({
        audiences: [],
        total: 0,
    }),
    actions: {
        async searchAudiences(body: object): Promise<any> {
            try {
                const response = await api().post('Audience/Search', body);
                if (response.status === 200) {
                    this.audiences = response.data.data;
                    this.total = response.data.total;

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async createAudience(body: Audience): Promise<any> {
            try {
                const response = await api().post('Audience', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Audience Created!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async updateAudience(body: Audience): Promise<any> {
            try {
                const response = await api().put('Audience', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Audience Updated!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async removeAudience(body: string): Promise<any> {
            try {
                const response = await api().delete(`Audience?id=${body}`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Audience Deleted!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },
    },
    getters: {
        getAudiences: state => state.audiences,
        getTotal: state => state.total,
    }
})