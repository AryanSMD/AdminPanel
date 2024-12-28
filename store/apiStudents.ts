interface States {
    students: Student[],
    total: number,
}

export const useStudentsApi = defineStore('useStudentsApi', {
    state: (): States => ({
        students: [],
        total: 0,
    }),
    actions: {
        async searchStudents(body: object): Promise<any> {
            try {
                const response = await api().post('Student/Search', body);
                if (response.status === 200) {
                    this.students = response.data.data;
                    this.total = response.data.total;

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async createStudent(body: Student): Promise<any> {
            try {
                const response = await api().post('Student', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Student Created!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async updateStudent(body: Student): Promise<any> {
            try {
                const response = await api().put('Student', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Student Updated!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async removeStudent(body: string): Promise<any> {
            try {
                const response = await api().delete(`Student?id=${body}`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Student Deleted!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },
    },
    getters: {
        getStudents: state => state.students,
        getTotal: state => state.total,
    }
})