import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '~/store';
import vueRouteMiddleware from './VueRouteMiddleware';
import { hidePace, showPace } from '~/services/GlobalService';

Vue.use(VueRouter);

Vue.mixin({
  beforeCreate() {
    console.log('[beforeCreate][this] => ', this);
  },
  beforeMount() {
    console.log('[beforeMount][this] => ', this);
  },
  beforeDestroy() {
    console.log('[beforeDestroy][this] => ', this);
  },
  beforeRouteLeave(to, from, next) {

    console.log('[beforeRouteLeave][this] => ', this, from, to);
    // instance created, we can use 'this'
    if (!from.params?.isEditing) {
      // Hide pacing when navigation completed
      hidePace();
      return next();
    }
    let confirmBeforeLeave = from.params?.confirmBeforeLeave;
    if (typeof confirmBeforeLeave !== 'function') {
      // Remove keys (isEditing & confirmBeforeLeave)
      try {
        delete from.params.isEditing;
      } catch (err) {}
      console.log('[beforeRouteLeave] => confirmBeforeLeave is not a function: ', confirmBeforeLeave);
      // Hide pacing when navigation completed
      hidePace();
      return next();
    }
    // Remove keys (isEditing & confirmBeforeLeave)
    try {
      delete from.params.isEditing;
      delete from.params.confirmBeforeLeave;
    } catch (err) {}

    if (confirmBeforeLeave(next)) {
      // Hide pacing when navigation completed
      hidePace();
      next();
    }
    return null;
  },
  beforeRouteUpdate(to, from, next) {
    // instance created, we can use 'this'
    console.log('[beforeRouteUpdate][this] => ', this);
  },
  beforeRouteEnter(to, from, next) {
    // instance has not created yet, we do not use 'this'
    console.log('[beforeRouteEnter][this] => ', this);
    // Show pacing when starting navigation
    showPace();
    next();
  }
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Register a global `before` guard (Vue Router navigation guards)
router.beforeEach(vueRouteMiddleware);

router.beforeResolve((to, from, next) => {
  console.log('[router][beforeResolve] => ', from.path, from, to);
  return next();
})

router.afterEach((to, from) => {
  console.log('[router][afterEach] => ', from.path, from, to);
});

export default router;
