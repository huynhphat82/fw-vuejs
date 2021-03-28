<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener" class="warn">vue-cli documentation</a>.
    </p>
    <h3 v-color-text="'green'">Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress" target="_blank" rel="noopener">e2e-cypress</a></li>
    </ul>
    <h3 class="red" v-color:bg="'green'">Essential Links</h3>
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

    <signup />

    <div>
      {{ uppercase | uppercase }}
    </div>

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

    <error :errors="[1234]" />

    <div>
      <button @click="goValidation">Go Validation</button>
    </div>

    <div>
      <h3>Modal</h3>
      <button @click="showModal">Show modal</button>
    </div>

    <div>
      <h3 class="warn">Spinner</h3>
      <button @click="showSpinner">Show spinner</button>
      <button @click="hideSpinner">Hide spinner</button>
    </div>

    <div>
      <h3>Loader</h3>
      <loader />
      <button @click="showLoader">Show loader</button>
      <button @click="hideLoader">Hide loader</button>
    </div>

  </div>
</template>

<script>
import { H, withLoading, __ } from '../services';
import { Http } from '@services';
import { SET_LANG } from '@store';
import { ModalLoadSpinErrorPlugin } from '~/services/commons/plugins';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  async created() {
    // console.log('$http1 => ', this.$http);
    // this.$http.get('https://jsonplaceholder.typicode.com/users').then((response, error) => {
    //   console.log('response => ', response)
    //   console.log('error => ', error)
    // })
    // let response = await this.$http.get('https://jsonplaceholder.typicode.com/users');
    // console.log('response => ', response);
    // console.log('api1 => ', await this.$api.getUsers());
    // console.log('api2 => ', await this.$api.getUserDetail(3));
    // console.log('api => get posts => ', await this.$api.getPosts());
    // console.log('api => create post =>', await this.$api.createPost({
    //   title: 'Phat',
    //   body: 'This is Phat',
    //   userId: 1,
    // }));

    // let post = await this.$api.getPost(1);
    // console.log('api => post (id=1) => ', post);

    // post = post.data;
    // post.title = 'This title was changed!';
    // console.log('api => update post (id=1) [put] => ', await this.$api.updatePost(post));
    // console.log('api => update post (id=1) [patch] => ', await this.$api.updatePost(post.id, {
    //   title: 'This title was changed by patch method',
    // }));

    // console.log('api => delete post (id=1) => ', await this.$api.deletePost(post.id));

    withLoading(async stopLoading => {
      let post = await this.$api.getPost(1, false);
      console.log('post => ', post);
      let user = await this.$api.getUserDetail(post.data.id, false)
      console.log('user => ', user);
      let result = await this.$api.createPost({
        title: 'Phat',
        body: 'This is Phat',
        userId: user.data.id,
      });
      console.log('create post => ', result);
      stopLoading();
    })

    let users = await this.$apiAnother.getUsers();

    console.log('users => ', users)
  },
  mounted() {
    console.log('$http2 => ', this.$httpAnother);
    console.log('H => ', H)
    console.log('H => ', this.$t, this.t, this.trans, this.__)
    console.log('Http => ', Http)
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
    uppercase: 'Convert to captitalize',
  }),
  methods: {
    async callSetLangActions (event) {
      // this.$store.dispatch(SET_LANG, event.target.getAttribute('value'))
      console.log('lang1 => ', this.$lang);
      // this.$setLang(event.target.getAttribute('value'));
      this.$lang = event.target.getAttribute('value');
      console.log('lang2 => ', this.$lang);

      let user = await this.$api.getUserDetail(1)
      console.log('user [lang] => ', user);
    },
    showModal() {
      const params = {
        title: "Test!",
        message: "test test test",
        onConfirm: () => {
          return this.alertFunc();
        }
      };
       this.$modal.show(params);
    },
    alertFunc() {
      alert('Hello!');
    },
    showSpinner() {
      this.$spinner.show();
      setTimeout(() => {
        this.hideSpinner();
      }, 5000)
    },
    hideSpinner() {
      this.$spinner.hide();
    },
    showLoader() {
      this.$loader.show({ message: 'Loading...', style: { color: 'red' }, showMessage: false });
    },
    hideLoader() {
      this.$loader.hide();
    },
    goValidation() {
      console.log(this.$router)
      this.$route.params.isEditing = true;
      this.$route.params.confirmBeforeLeave = function (next) {
        this.$modal.show({
          title: 'Confirmation',
          message: 'Do you want to update berfore leaving?',
          handleOk: () => next(),
          handleCancel: () => next(),
          handleClose: () => next(false)
        });
      }.bind(this);
      // this.$router.push({ name: 'validation'});
      this.navigate({ name: 'validation'});
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
