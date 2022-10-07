<template>
  <div v-if="visible">
    <div class="v-spinner-wrapper">
      <!-- <div id="loading"></div> -->
      <div class="v-spinner"></div>
      <div class="v-spinner-message"></div>
    </div>
    <div class="v-spinner-backdrop"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      message: '',
      visible: false,
      onConfirm: null,
    }
  },
  methods: {
    hide() {
      this.visible = false;
    },
    confirm() {
      if (typeof this.onConfirm === 'function') {
        this.onConfirm();
      }
      this.hide();
    },
    show(params) {
      this.visible = true;
      this.title = params?.title || '';
      this.message = params?.message || '';
      this.onConfirm = params?.onConfirm || null;
    }
  },
  beforeMount() {
    // Register / listening 'show' event
    this.$spinner.EventBus.$on('show-spin', params => {
      console.log('show-spin event => start')
      this.show(params);
    });
    this.$spinner.EventBus.$on('hide-spin', () => {
       console.log('hide-spin event => start')
      this.hide();
    });
  }
};

</script>

<style scoped lang="scss">

.v-spinner-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  /* border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
  background-color: transparent;
  z-index: 9999999;
}
.v-spinner,
.v-spinner:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
  z-index: 9999999;
}
.v-spinner {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 3px solid blue;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: blue;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

.v-spinner-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  opacity: 1;
  z-index: 9999998;
}

</style>
