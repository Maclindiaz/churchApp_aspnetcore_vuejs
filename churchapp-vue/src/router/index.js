import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/giver',
    name: 'Giver',
    component: () => import('../views/giver/Giver.vue'),
    beforeEnter(to, from, next) {
      if (!store.state.isAuthenticated) {
        next({ name: 'Login' });
      } else { next() }
    },
  },
  {
    path: '/giver/:id',
    name: 'EditGiver',
    component: () => import('../views/giver/EditGiver.vue'),
    // props: true,
    beforeEnter(to, from, next) {
      if (!store.state.isAuthenticated) {
        next({ name: 'Login' });
      } else { next() }
    },
  }
  ,
  {
    path: '/register',
    name: 'Register',
    component: () => import('../account/RegisterPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../account/LoginPage.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../welcome/WelcomePage.vue')
  },

  {
    path: '/donation',
    name: 'Donation',
    component: () => import('../views/donation/Donation.vue'),
    children: [
      {
        path: '',
        name: 'Donation',
        component: () => import('../views/donation/DonationList.vue')
      },
      {
        path: 'add',
        name: 'AddDonation',
        component: () => import('../views/donation/AddDonation.vue')
      }, 
      {
        path: 'edit/:id',
        name: 'EditDonation',
        component: () => import('../views/donation/EditDonation.vue'),
        props: (route) => ({
          donation: {},
          ...route.params
        }),
      },
      {
        path: 'report',
        name: 'DonationReport',
        component: () => import('../views/donation/DonationReport.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
