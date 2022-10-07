import pipelineMiddleware from './pipelineMiddleware';
import store, { useAsyncStorage } from '~/store';

const vueRouteMiddleware = async (to, from, next) => {
  console.log('[router][beforeEach] => ', from.path, from, to);

  // Wait for storage to be ready
  if (useAsyncStorage) {
    await store.restored;
  }

  const middleware = to.meta.middleware;

  if (!middleware || middleware.length < 1) {
    return next();
  }

  const context = { to, from, next, store };

  return middleware[0]({
    ...context,
    next: pipelineMiddleware(context, middleware, 1)
  });
};

export default vueRouteMiddleware;
