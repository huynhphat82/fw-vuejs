import NotFound from '~/components/NotFound';
import Product from '~/components/Product';
import Profile from '~/components/Profile';
import Signin from '~/components/Signin';
import Signup from '~/components/Signup';
import { auth, guest, subscribed } from '~/middlwares';
import Home from '../views/Home.vue';
import Validation from '../views/Validation.vue';
import User from './../components/User';

const routes = [
  {
    path: '/',
    alias: '',
    name: 'home',
    component: Home,
    meta: {
      middleware: [
        // auth
      ]
    },
    children: [
      {
        path: '/home/products',
        name: 'home.products',
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
    name: 'signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    meta: {
      middleware: [
        // guest
      ]
    }
  },
  {
    path: '/user/:id',
    name: 'user.detail',
    component: User,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
      }
    ]
  },
  {
    path: '/validation',
    name: 'validation',
    component: Validation,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '*', component: NotFound }
];

export default routes;
