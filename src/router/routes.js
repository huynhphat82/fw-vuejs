import NotFound from '~/components/NotFound';
import Product from '~/components/Product';
import Profile from '~/components/Profile';
import Signin from '~/components/Signin';
import Signup from '~/components/Signup';
import { auth, guest, subscribed } from '~/middlwares';

import Home from '../views/Home.vue';
import Validation from '../views/Validation.vue';
import User from './../components/User';
import { ROUTE } from './ROUTE';

const routes = [
  {
    path: '/',
    alias: '',
    name: ROUTE.HOME,
    component: Home,
    meta: {
      middleware: [
        auth
      ]
    },
    children: [
      {
        path: '/home/products',
        name: ROUTE.PRODUCT,
        component: Product,
        meta: {
          middleware: [
            // auth,
            // subscribed,
          ]
        }
      },
    ]
  },
  {
    path: '/signup',
    name: ROUTE.SIGNUP,
    component: Signup,
  },
  {
    path: '/signin',
    name: ROUTE.SIGNIN,
    component: Signin,
    meta: {
      middleware: [
        // guest
      ]
    }
  },
  {
    path: '/user/:id',
    name: ROUTE.USER_DETAIL,
    component: User,
    children: [
      {
        path: 'profile',
        name: ROUTE.PROFILE,
        component: Profile,
      }
    ]
  },
  {
    path: '/validation',
    name: ROUTE.VALIDATION,
    component: Validation,
  },
  {
    path: '/about',
    name: ROUTE.ABOUT,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', component: NotFound }
];

export default routes;
