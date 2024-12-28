interface States {
    categories: Category[],
    total: number,
}

export const useCategoriesApi = defineStore('useCategoriesApi', {
    state: (): States => ({
        categories: [],
        total: 0,
    }),
    actions: {
        async searchCategories(body: object): Promise<any> {
            try {
                const response = await api().post('Category/Search', body);
                if (response.status === 200) {
                    this.categories = response.data.data;
                    this.total = response.data.total;

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async createCategory(body: Category): Promise<any> {
            try {
                const response = await api().post('Category', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Category Created!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async updateCategory(body: Category): Promise<any> {
            try {
                const response = await api().put('Category', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Category Updated!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async removeCategory(body: string): Promise<any> {
            try {
                const response = await api().delete(`Category?id=${body}`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Category Deleted!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },
    },
    getters: {
        getCategories: state => state.categories,
        getTotal: state => state.total,
    }
})