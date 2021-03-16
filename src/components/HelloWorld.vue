<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener" class="warn">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress" target="_blank" rel="noopener">e2e-cypress</a></li>
    </ul>
    <h3 class="red">Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener" class="blue">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>

    <div
      class="item"
      v-for="lang in optionLangs"
      :value="lang.value"
      :key="lang.value"
      @click.prevent="callSetLangActions"
    >{{ lang.text }}</div>

    <div>{{ $t('name') }}</div>
    <div>{{ $t('common.hello', { msg: 'Hello', year: 2021}) }}</div>
    <div>{{ $t('dialog.button-1') }}</div>

    <div v-on:click="globalHelper">Click me 1</div>
    <div v-on:click="globalFn">Click me 2</div>

    <validator vid="required|email" name="E-mail Address" rules="secret" v-slot="{ errors }">
      <label>{{ trans('name') }}</label>
      <label>{{ t('common.yes') }}</label>
      <label>{{ __('common.no') }}</label>
      <input name="email" type="text" v-model="email">
      <span>{{ errors[0] }}</span>
    </validator>

    <validator rules="required|password:@confirm" v-slot="{ errors }">
      <input type="password" v-model="password">
      <span>{{ errors[0] }}</span>
    </validator>

    <validator name="confirm" rules="required" v-slot="{ errors }">
      <input type="password" v-model="confirmation">
      <span>{{ errors[0] }}</span>
    </validator>

    <validator name="testing" rules="required" v-slot="{ errors }">
      <input type="text">
      <span>{{ errors[0] }}</span>
    </validator>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data: () => ({
    optionLangs: [
      {
        text: 'Vietnamese',
        value: 'vn'
      },
      {
        text: 'English',
        value: 'en'
      }
    ],
    email: null,
    confirmation: null,
    password: null,
    testing: null
  }),
  methods: {
    callSetLangActions (event) {
      this.$store.dispatch('setLang', event.target.getAttribute('value'))
    }
  }
}
console.log(process.env)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.blue {
  color: $primary;
}
</style>
