import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Profile from '../views/Admin/Profile.vue'
import ChangePassword from '../views/Admin/ChangePassword.vue'
import License from '../views/Admin/License.vue'

import PageNotFound from '../views/PageNotFound.vue'

import Checkout from '../views/Checkout/Checkout.vue'

import ShowDetails from '../views/Motor/ShowDetails.vue'
import LoanMotor from '../views/Motor/LoanMotor.vue'
import ListMotors from '../views/Motor/ListMotors.vue'
import YourMotors from '../views/Motor/YourMotors.vue'

import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'

import Success from '../helper/payment/Success.vue'
import Failed from '../helper/payment/Failed.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // motor route
  {
    path : '/motor/show/:id',
    name : 'ShowDetails',
    component: ShowDetails
  },
  {
    path: '/motor/loan',
    name: 'LoanMotor',
    component: LoanMotor
  },
  {
    path: '/motor/list',
    name: 'ListMotors',
    component: ListMotors
  },
  {
    path: '/motor/show',
    name: 'YourMotors',
    component: YourMotors
  },
  // Profile
  {
    path: '/admin/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/admin/password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/admin/license',
    name: 'IdLicense',
    component: License
  },
  //Page Not found
  {
    path : '/:catchAll(.*)',
    name : 'PageNotFound',
    component : PageNotFound
  },
  //Signin and Signup
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path : '/checkout',
    name : 'Checkout',
    component : Checkout
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component:Success
  },
  {
    path: '/payment/failed',
    name: 'FailedPayment',
    component:Failed
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//scroll to top after every route change
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router
