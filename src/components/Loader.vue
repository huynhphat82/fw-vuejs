<template>
  <div v-if="visible" class="loader-wrap">
    <div class="v-loader"></div>
    <div class="v-loader-message" v-if="showMessage" :style="style">{{ message }}</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      showMessage: true,
      message: '',
      style: {}
    }
  },
  methods: {
    hide() {
      this.visible = false;
    },
    show(params) {
      this.visible = true;
      this.message = params?.message || '';
      this.showMessage = typeof params?.showMessage === 'boolean' ? params.showMessage : true;
      this.style = params?.style || {};
    }
  },
  beforeMount() {
    // Register / listening 'show' event
    this.$loader.EventBus.$on('show-loading', params => {
      this.show(params);
    });
    this.$loader.EventBus.$on('hide-loading', () => {
      this.hide();
    });
  }
};

</script>

<style scoped lang="scss">

.loader-wrap {
  margin: auto;
}
.v-loader,
.v-loader:before,
.v-loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.v-loader {
  color: blue;
  font-size: 10px;
  margin: auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  top: -2.5em;
}
.v-loader:before,
.v-loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.v-loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.v-loader:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
