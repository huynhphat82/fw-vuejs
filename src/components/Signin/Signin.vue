<template>
  <div>
    <div>Signin Page</div>
    <button v-if="!isLoggedIn" @click="signin()">Signin</button>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { ROUTE } from '~/router';

export default {
  computed: mapState({
    isLoggedIn: state => !!state.user && state.user.isLoggedIn
  }),
  data() {
    return {

    }
  },
  methods: {
    signin() {
      this.$store.dispatch('signin', {
        isLoggedIn: true,
        isSubscribed: false,
      });
      this.navigate({ name: ROUTE.HOME });
    }
  }
}

</script>

<style lang='scss' scoped src="./style/index.scss"></style>
