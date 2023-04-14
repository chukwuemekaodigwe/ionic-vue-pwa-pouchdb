import { createRouter, createWebHistory } from '@ionic/vue-router';
import { nextTick } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { getDateOnly } from '../helpers/useActionSheet';
import { useStore } from 'vuex';


function checkAuth() {
  if (localStorage.getItem('isAuth') != getDateOnly()) {
    return router.push('/login')
  }
}

function updateActivityLog(){
//const store = useStore()
localStorage.setItem('lastActive', JSON.stringify(new Date()))
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/home',
    component: () => import('../views/HomePage.vue'),
    name: 'homePage',
    beforeEnter: checkAuth
  },
  {
    path: '/products',
    component: () =>
      import('../views/products/index.vue'),
   beforeEnter: [checkAuth, updateActivityLog]
  },
  {
    path: '/storefront',
     component: () => import('../views/salesFront.vue'),
     beforeEnter: [checkAuth, updateActivityLog]
  },
  {
    path: '/stocks',
    component: () =>
      import('../views/stocks/index.vue'),
      beforeEnter: [checkAuth, updateActivityLog]
  },
  {
    path: '/login',
    component: () =>
      import('../views/auth/login2.vue')
  },


  {
    path: '/signup',
    component: () =>
      import('../views/auth/signup2.vue')
  },

  {
    path: '/email/verify/:key',
    component: () =>
      import('../views/auth/login2.vue')
  },
  {
    path: '/config',
    component: () =>
      import('../views/systemConfig.vue'),
      beforeEnter: checkAuth  
  },

  {
    path: '/test',
    component: () =>
      import('../views/testPage.vue')
  },

  {
    path: '/signup2',
    component: () =>
      import('../views/auth/buttons/login-button.vue')
  },
  {
    path: '/transfer',
    component: () =>
    import('../views/stocks/transferStock.vue')
  },


  // {
  //   path: '/profile',
  //   component: () =>
  //   import('../views/myProfile.vue')
  // },
  {
    path: '/logout',
    component: () =>
      import('../views/auth/login2.vue')
  },
  {
    path: '/employees',
    component: () =>
      import('../views/auth/employeesPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
