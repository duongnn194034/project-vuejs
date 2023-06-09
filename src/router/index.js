import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Profile from '../views/Admin/Profile.vue'
import ChangePassword from '../views/Admin/ChangePassword.vue'
import License from '../views/Admin/License.vue'
import Bank from '../views/Admin/Bank.vue'
import Address from '../views/Admin/Address.vue'

import UserProfile from '../views/User/UserProfile.vue'

import PageNotFound from '../views/PageNotFound.vue'

import Checkout from '../views/Checkout/Checkout.vue'

import ShowDetails from '../views/Motor/ShowDetails.vue'
import LoanMotor from '../views/Motor/LoanMotor.vue'
import ListMotors from '../views/Motor/ListMotors.vue'
import MyMotors from '../views/Motor/MyMotors.vue'
import EditMotor from '../views/Motor/EditMotor.vue'

import MyOffers from '../views/Offer/MyOffers.vue'
import OfferDetails from '../views/Offer/OfferDetails.vue'

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
    name: 'MyMotors',
    component: MyMotors
  },
  {
    path: '/admin/motor/:id',
    name: 'EditMotor',
    component: EditMotor
  },
  // Profile
  {
    path: '/admin/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/account/password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/account/license',
    name: 'IdLicense',
    component: License
  },
  {
    path: '/account/bank',
    name: 'Bank',
    component: Bank
  },
  {
    path: '/account/address',
    name: 'Address',
    component: Address
  },
  {
    path: '/profile/:id',
    name: 'UserProfile',
    component: UserProfile
  },
  // Offer
  {
    path: '/account/mybookings',
    name: 'MyOffers',
    component: MyOffers
  },
  {
    path: '/offer/:id',
    name: 'OfferDetails',
    component: OfferDetails
  },
  // Page Not found
  {
    path : '/:catchAll(.*)',
    name : 'PageNotFound',
    component : PageNotFound
  },
  // Signin and Signup
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
