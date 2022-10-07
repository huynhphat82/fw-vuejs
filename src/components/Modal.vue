<template>
  <div v-if="visible">
    <div class="modal-wrapper">
      <div class="modal-close" @click="close">X</div>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="modal-button" @click="hide">No</button>
        <button class="modal-button" @click="confirm">Yes</button>
      </div>
    </div>
    <div class="modal-backdrop" @click="close"></div>
  </div>
</template>

<script>

import { __ } from '~/services';

export default {
  data() {
    return {
      title: '',
      message: '',
      visible: false,
      onConfirm: null,
    };
  },
  methods: {
    hide() {
      this.visible = false;
      if (__.isFn(this.handleCancel)) {
        this.handleCancel();
      }
    },
    close() {
      this.visible = false;
      if (__.isFn(this.handleClose)) {
        this.handleClose();
      }
    },
    confirm() {
      if (__.isFn(this.handleOk)) {
        this.handleOk();
      }
      this.hide();
    },
    show(params) {
      const { title, message, handleOk, handleClose, handleCancel } = params || {};
      this.visible = true;
      this.title = title || 'Confirmation';
      this.message = message || '';
      this.handleOk = handleOk || null;
      this.handleCancel = handleCancel || null;
      this.handleClose = handleClose || null;
    }
  },
  beforeMount() {
    // Register / listening 'show' event
    this.$modal.EventBus.$on('show', params => this.show(params));
  }
};

</script>

<style scoped lang="scss">

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

.modal-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  border: 1px solid black;
  padding: 4px 6px;
}

</style>
