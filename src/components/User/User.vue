
<template>
  <div>
    <div>UserId: {{ $route.params.id }}</div>
    <div @sayHello="greeting($event)">Get greeting</div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    greeting(event) {
      alert(event);
    }
  }
}
</script>

<style lang="scss" scoped src="./style/index.scss"></style>
