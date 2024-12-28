interface States {
    courses: Course[],
    total: number,
}

export const useCoursesApi = defineStore('useCoursesApi', {
    state: (): States => ({
        courses: [],
        total: 0,
    }),
    actions: {
        async searchCourses(body: object): Promise<any> {
            try {
                const response = await api().post('Course/Search', body);
                if (response.status === 200) {
                    this.courses = response.data.data;
                    this.total = response.data.total;

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async createCourse(body: Course): Promise<any> {
            try {
                const response = await api().post('Course', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Course Created!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async updateCourse(body: Course): Promise<any> {
            try {
                const response = await api().put('Course', body);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Course Updated!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },

        async removeCourse(body: string): Promise<any> {
            try {
                const response = await api().delete(`Course?id=${body}`);
                if (response.status === 200) {
                    alerts().showAlert({ type: 'success', msg: 'Course Deleted!', func: ()=>{} });

                    return response;
                }
            } catch (err) {
                return err;
            }
        },
    },
    getters: {
        getCourses: state => state.courses,
        getTotal: state => state.total,
    }
})