import { mapState, mapActions } from 'vuex';
import { connect } from '~/store';
import { MODULES } from '~/store/appVeux';
import { ADD_PRODUCT, SET_PRODUCTS, SET_PRODUCTS_ASYNC } from '~/store/modules/product';
import Test from './Test';

const mapToState = mapState({
  products: state => state.product.products,
});

const mapToDispatch = mapActions(MODULES.PRODUCT,  {
  getAllProducts: SET_PRODUCTS,
  getAllProductsAsync: SET_PRODUCTS_ASYNC,
  newProduct: ADD_PRODUCT,
});

export default connect(mapToState, mapToDispatch)(Test);
