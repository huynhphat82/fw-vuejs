const Test = {
  local() {
    return {
      name: 'counterApp',
      state: {
        count: 10,
      },
      getters: {
        half: state => state.count / 2,
      },
      actions: {
        asyncIncrement({ commit }) {
          setTimeout(() => {
            commit('increment') // this commit can only affect local mutation
          }, 1000);
        }
      },
      mutations: {
        increment(state) {
          state.count += 1;
        },
      }
    }
  },

  data() {
    return {
      test: 'Hello Test',
    }
  },

  methods: {
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

export default Test;
