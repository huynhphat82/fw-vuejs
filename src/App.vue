<template>
  <div id="app">
    <pace />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/validation">Validation</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <modal />
    <spinner />
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
