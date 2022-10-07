import { mapState, mapActions } from 'vuex';
import { MODULES } from '~/store/appVeux';
import { ADD_PRODUCT, SET_PRODUCTS, SET_PRODUCTS_ASYNC } from '~/store/modules/product';

export default {
  computed: mapState({
    products: state => state.product.products
  }),

  data() {
    return {
      test: 'Hello Test',
    }
  },

  methods: {
    ...mapActions(MODULES.PRODUCT, {
      getAllProducts: SET_PRODUCTS,
      getAllProductsAsync: SET_PRODUCTS_ASYNC,
      // addProduct: ADD_PRODUCT,
      newProduct: ADD_PRODUCT,
    }),
    addProduct() {
      // this.$store.dispatch('product/addProduct', {
      //   'id': 4, 'title': 'iPad 8 Mini', 'price': 600, 'inventory': 20
      // });
      this.newProduct({
        'id': 4, 'title': 'iPad 8 Mini', 'price': 600, 'inventory': 20
      });
    },
  },

  created() {
    // this.$store.dispatch('product/setProducts'); // manual
    this.getAllProductsAsync();
  }
};
