<template>
  <span>
    <span v-if="!show_all" class="error">{{  error_message }}</span>
    <ul v-else>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </span>
</template>

<script>

export default {
  name: 'Error',
  props: {
    errors: {
      type: Array,
      default: function () {
        return [];
      },
    },
    show_all: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({}),
  computed: {
    error_message: function () {
      return this.errors.length > 0 ? this.errors[0] : '';
    }
  },
}

</script>

<style scoped lang="scss"></style>
