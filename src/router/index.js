import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Admin from '../views/Admin/Admin.vue'
import Gallery from '../views/Admin/Gallery.vue'
import AddImage from '../views/Admin/AddImage.vue'
import Profile from '../views/Admin/Profile.vue'
import ChangePassword from '../views/Admin/ChangePassword.vue'

import PageNotFound from '../views/PageNotFound.vue'

import Product from '../views/Product/Product.vue'
import AddProduct from '../views/Product/AddProduct.vue'
import EditProduct from '../views/Product/EditProduct.vue'
import ShowDetails from '../views/Product/ShowDetails.vue'
import ListProductsRe from '../views/Product/ListProductsRe.vue'
import Checkout from '../views/Checkout/Checkout.vue'

import LoanMotor from '../views/Motor/LoanMotor.vue'

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
  //Admin routes
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path : '/admin/gallery',
    name : 'Gallery',
    component : Gallery
  },
  {
    path : '/admin/gallery/add',
    name : 'AddImage',
    component : AddImage
  },
  //Product routes
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/productSearch/:query',
    name: 'ListProductsSearch',
    component: ListProductsRe
  },
  {
    path: '/admin/product',
    name: 'AdminProduct',
    component: Product
  },
  {
    path: '/admin/product/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/admin/product/:id',
    name: 'EditProduct',
    component: EditProduct,
  },
  {
    path : '/product/show/:id',
    name : 'ShowDetails',
    component: ShowDetails
  },
  // Motor routes
  {
    path: '/motor/loan',
    name: 'LoanMotor',
    component: LoanMotor
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
