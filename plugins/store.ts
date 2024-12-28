import { useAlert } from "~/store/alert";
import { useStudentsApi } from "~/store/apiStudents";
import { useUsersApi } from "~/store/apiUsers";
import { useLoadingScreen } from "~/store/loadingScreen";
import { useDefaults } from '~/store/defaults';
import { useCoursesApi } from '~/store/apiCourses';
import { useLanguagesApi } from '~/store/apiLanguages';
import { useAudiencesApi } from '~/store/apiAudiences';
import { useCategoriesApi } from '~/store/apiCategories';


export default defineNuxtPlugin(() => {
    return {
        provide: {
            useDefaults,
            useLoadingScreen,
            useAlert,
            useStudentsApi,
            useUsersApi,
            useCoursesApi,
            useAudiencesApi,
            useLanguagesApi,
            useCategoriesApi,
        },
    }
})