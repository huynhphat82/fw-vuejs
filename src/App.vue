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
