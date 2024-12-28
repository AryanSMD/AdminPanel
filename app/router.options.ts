import type { RouterConfig } from '@nuxt/schema'
import Login from '../pages/Login.vue'
import PageParent from '../pages/PageParent.vue'
import Dashboard from '../pages/Dashboard.vue'
import Courses from '../pages/Courses.vue'
import UsersManagement from '../pages/UsersManagement.vue'
import StudentsManagement from '../pages/StudentsManagement.vue'
import LanguagesManagement from '../pages/LanguagesManagement.vue'
import CategoriesManagement from '../pages/CategoriesManagement.vue'
import AudiencesManagement from '../pages/AudiencesManagement.vue'
import AddCourse from '../pages/AddCourse.vue'
import Error from '../pages/Err404.vue'

export default <RouterConfig> {
  routes: () => [
    {
      name: 'login',
      path: '/',
      component: Login,
      meta: { header: false }
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: { header: true }
    },
    {
      name: 'usersManagement',
      path: '/usersManagement',
      component: UsersManagement,
      meta: { header: true }
    },
    {
      name: 'studentsManagement',
      path: '/studentsManagement',
      component: StudentsManagement,
      meta: { header: true }
    },
    {
      name: 'categoriesManagement',
      path: '/categoriesManagement',
      component: CategoriesManagement,
      meta: { header: true }
    },
    {
      name: 'audiencesManagement',
      path: '/audiencesManagement',
      component: AudiencesManagement,
      meta: { header: true }
    },
    {
      path: '/courses',
      component: PageParent,
      meta: { header: true, },
      children: [
        {
          name: 'courses',
          path: '',
          component: Courses,
        },
        {
          path: 'addCourse',
          component: PageParent,
          children: [
            {
              name: 'add',
              path: ':id',
              component: AddCourse,
            },
          ]
        }
      ]
    },
    {
      name: 'languagesManagement',
      path: '/languagesManagement',
      component: LanguagesManagement,
      meta: { header: true }
    },
    {
      name: '404-NotFound',
      path: '/:pathMatch(.*)*',
      component: Error,
      meta: { header: true },
    },
  ],
}