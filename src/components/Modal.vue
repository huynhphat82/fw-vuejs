<template>
  <div v-if="visible">
    <div class="modal-wrapper">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="modal-button" @click="hide">No</button>
        <button class="modal-button" @click="confirm">Yes</button>
      </div>
    </div>
    <div class="modal-backdrop" @click="hide"></div>
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
      this.title = params.title || '';
      this.message = params.message || '';
      this.onConfirm = params.onConfirm || null;
    }
  },
  beforeMount() {
    // Register / listening 'show' event
    this.$modal.EventBus.$on('show', params => {
      this.show(params);
    })
  }
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  z-index: 1000;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #FFFFFF;
  z-index: 9999999;
}
.modal-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 9999999;
}
.modal-button {
  flex-grow: 1;
  z-index: 9999999;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  opacity: 0.6;
  z-index: 9999998;
}
</style>
