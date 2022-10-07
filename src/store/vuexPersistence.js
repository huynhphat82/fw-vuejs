import VuexPersistence from 'vuex-persist';
import AsyncStorage from './AsyncStorage';

const vuexPersistence = new VuexPersistence({
  key: 'vuex',
  storage: AsyncStorage,// window.localStorage,
  // reducer: state => ({ products: state.products }),
  // filter: mutation => (mutation.type == "filtered_type"),
  // modules: ['module1', 'module2'], // list of modules you want to persist
  asyncStorage: true,
  supportCircular: false, // if true, we must install (npm install flatted)
  strictMode: process.env.NODE_ENV !== 'production',
});

export default vuexPersistence;
