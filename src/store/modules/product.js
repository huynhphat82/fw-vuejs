import shop from './api';

export const SET_PRODUCTS = 'setProducts';
export const SET_PRODUCTS_ASYNC = 'setProductsAsync';
export const ADD_PRODUCT = 'addProduct';
export const DECREMENT_PRODUCT_INVENTORY = 'decrementProductInventory';
export const INCREMENT_PRODUCT_INVENTORY = 'incrementProductInventory';

// initial state
const state = () => ({
  products: []
});

// getters
const getters = {};

// actions
const actions = {
  // Use callback
  [SET_PRODUCTS]: ({ commit, state, dispatch }) => {
    shop.getProducts(products => {
      commit(SET_PRODUCTS, products);
    });
  },

  // Use async (promise/await)
  async [SET_PRODUCTS_ASYNC]({ commit, dispatch, state, rootState, rootGetters }) {
    commit(SET_PRODUCTS, await shop.getProductsAsync());
  },

  // [ADD_PRODUCT]: ({ commit, state, dispatch }, product) => {
  //   commit(ADD_PRODUCT, product);
  // },

  // Use sync
  [ADD_PRODUCT]: (context, product) => {
    context.commit(ADD_PRODUCT, product);
  },
};

// mutations
const mutations = {
  [SET_PRODUCTS]: (state, payload) => {
    state.products = payload
  },
  [ADD_PRODUCT]: (state, payload) => {
    state.products.push(payload);
  },
  [DECREMENT_PRODUCT_INVENTORY]: (state, { id }) => {
    const product = state.products.find(product => product.id === id);
    product.inventory--
  },
  [INCREMENT_PRODUCT_INVENTORY]: (state, { id }) => {
    const product = state.products.find(product => product.id === id);
    product.inventory++
  }
};

const product = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default product;
