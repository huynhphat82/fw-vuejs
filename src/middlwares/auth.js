
/**
 * Check user whether he is authenticated
 *
 * @param func next
 * @param object store
 * @return Redirector
 */
export default function auth({ next, store }) {
  if (!store.getters.auth.isLoggedIn) {
    return next({ name: 'signin' });
  }
  return next();
}
