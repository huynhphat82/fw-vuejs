import shop from './api';

const SET_PRODUCTS = 'setProducts';
const DECREMENT_PRODUCT_INVENTORY = 'decrementProductInventory';

// initial state
const state = () => ({
  products: []
})

// getters
const getters = {}

// actions
const actions = {
  getAllProducts: ({ commit }) => {
    shop.getProducts(products => {
      commit(SET_PRODUCTS, products);
    });
  }
};

// mutations
const mutations = {
  [SET_PRODUCTS]: (state, payload) => {
    state.products = payload
  },
  [DECREMENT_PRODUCT_INVENTORY]: (state, { id }) => {
    const product = state.products.find(product => product.id === id);
    product.inventory--
  },
};

const product = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default product;
