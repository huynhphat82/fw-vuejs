
export default function subscribed({ next, store }) {
  if (!store.getters.auth.isSubscribed) {
    return next({ name: 'home' });
  }
  return next();
}
