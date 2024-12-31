import type { RouterConfig } from '@nuxt/schema'
import Login from '../pages/Login.vue'
import PageParent from '../pages/PageParent.vue'
import Dashboard from '../pages/Dashboard.vue'
import Courses from '../pages/Courses.vue'
import UsersManagement from '../pages/UsersManagement.vue'
import LanguagesManagement from '../pages/LanguagesManagement.vue'
import CategoriesManagement from '../pages/CategoriesManagement.vue'
import AudiencesManagement from '../pages/AudiencesManagement.vue'
import AddCourse from '../pages/AddCourse.vue'
import Error404 from '../pages/Err404.vue'
import Error403 from '../pages/Err403.vue'

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
      name: 'users',
      path: '/users',
      component: UsersManagement,
      meta: { header: true }
    },
    {
      name: 'categories',
      path: '/categories',
      component: CategoriesManagement,
      meta: { header: true }
    },
    {
      name: 'audiences',
      path: '/audiences',
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
      name: 'languages',
      path: '/languages',
      component: LanguagesManagement,
      meta: { header: true }
    },
    {
      name: 'AccessDenied',
      path: '/accessdenied',
      component: Error403
    },
    {
      name: '404-NotFound',
      path: '/:pathMatch(.*)*',
      component: Error404,
      meta: { header: true },
    },
  ],
}