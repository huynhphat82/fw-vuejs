
import pipelineMiddleware from './pipelineMiddleware';

const vueRouteMiddleware = (to, from, next) => {
  console.log('[router][beforeEach] => ', from.path, from, to);
  if (!to.meta.middleware || to.meta.middleware.length < 1) {
    return next();
  }

  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  return middleware[0]({
    ...context,
    next: pipelineMiddleware(context, middleware, 1)
  });
};

export default vueRouteMiddleware;
