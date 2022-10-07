<template>
  <div>
    <div>Your profile</div>
    <button @click="say()">Send to parent</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      greeting: 'Hello Parent',
    };
  },
  methods: {
    say() {
      alert(222)
      this.$emit('sayHello', this.greeting);
    },
  }
}

</script>

<style lang="scss" scoped src="./style/index.scss"></style>
