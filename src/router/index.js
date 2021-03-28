import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '~/store';
import pipelineMiddleware from './pipelineMiddleware';

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
      return next();
    }
    let confirmBeforeLeave = from.params?.confirmBeforeLeave;
    if (typeof confirmBeforeLeave !== 'function') {
      // Remove keys (isEditing & confirmBeforeLeave)
      try {
        delete from.params.isEditing;
      } catch (err) {}
      console.log('[beforeRouteLeave] => confirmBeforeLeave is not a function: ', confirmBeforeLeave);
      return next();
    }
    // Remove keys (isEditing & confirmBeforeLeave)
    try {
      delete from.params.isEditing;
      delete from.params.confirmBeforeLeave;
    } catch (err) {}

    if (confirmBeforeLeave(next)) {
      next();
    }
    return null;
  },
  beforeRouteUpdate(to, from, next) {
    // instance created, we can use 'this'
    console.log('[beforeRouteUpdate][this] => ', this);
  },
  // beforeRouteEnter(to, from, next) {
  //   // instance has not created yet, we do not use 'this'
  //   console.log('[beforeRouteEnter][this] => ', this);
  //   next();
  // }
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Register a global `before` guard (Vue Router navigation guards)
router.beforeEach((to, from, next) => {
  console.log('[router][beforeEach] => ', to, from);
  if (!to.meta.middleware || to.meta.middleware.length < 1) {
    return next();
  }

  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  return middleware[0]({
    ...context,
    next: pipelineMiddleware(context, middleware, 1)
  });
});

router.beforeResolve((to, from, next) => {
  console.log('[router][beforeResolve] => ', to, from);
  return next();
})

router.afterEach((to, from) => {
  console.log('[router][afterEach] => ', to, from);
});

export default router;
