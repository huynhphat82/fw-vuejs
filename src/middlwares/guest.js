
/**
 * Check user whether he is authenticated
 *
 * @param func next
 * @param object store
 * @return Redirector
 */
export default function guest({ next, store }) {
  if (store.getters.auth.isLoggedIn) {
    return next({ name: 'home' });
  }
  return next();
}
