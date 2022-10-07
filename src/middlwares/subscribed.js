import { ROUTE } from '~/router';

export default function subscribed({ next, store }) {
  if (!store.getters.auth.isSubscribed) {
    return next({ name: ROUTE.HOME });
  }
  return next();
}
