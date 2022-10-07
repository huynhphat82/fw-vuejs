<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      <button @click="signout()">Logout</button>
      <br><br />
    </div>

    <!-- Directive -->
    <fieldset>
      <legend>Directives</legend>

      <h3 v-color-text="'green'">Color Directive 1</h3>
      <h3 class="red" v-color:bg="'green'">Color Directive 2</h3>
    </fieldset>
    <br>

    <!-- Pipe -->
    <fieldset>
      <legend>Pipes</legend>

      <div>
        {{ uppercase | uppercase }}
      </div>
    </fieldset>
    <br>

    <!-- Localization -->
    <fieldset>
      <legend>Localization</legend>

      <span
        style="margin-right: 5px; cursor: pointer;"
        class="item"
        v-for="lang in optionLangs"
        :value="lang.value"
        :key="lang.value"
        @click.prevent="callSetLangActions"
        :class="{bold: $lang == lang.value}"
      >{{ lang.text }}</span>

      <div>{{ $t('name') }}</div>
      <div>{{ $t('common.hello', { msg: 'Hello', year: 2021}) }}</div>
      <div>{{ $t('dialog.button-1') }}</div>
    </fieldset>
    <br>

    <!-- Global Function -->
    <fieldset>
      <legend>Global Function</legend>

      <div v-on:click="globalHelper">Click me 1</div>
      <div v-on:click="globalFn">Click me 2</div>
    </fieldset>
    <br>

    <!-- Modal -->
    <fieldset>
      <legend>Modal</legend>

      <div>
        <h3>Modal</h3>
        <button @click="showModal">Show modal</button>
      </div>
    </fieldset>
    <br>

    <!-- Spinner -->
    <fieldset>
      <legend>Spinner</legend>

      <div>
        <h3 class="warn">Spinner</h3>
        <button @click="showSpinner">Show spinner</button>
        <button @click="hideSpinner">Hide spinner</button>
      </div>
    </fieldset>
    <br>

    <!-- Loader -->
    <fieldset>
      <legend>Loader</legend>

      <div>
        <h3>Loader</h3>
        <loader />
        <button @click="showLoader">Show loader</button>
        <button @click="hideLoader">Hide loader</button>
      </div>
    </fieldset>
    <br>

    <signup />

    <error :errors="['This is error message.']" />

    <div>
      <button @click="goValidation">Go Validation</button>
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
      this.navigate({ name: 'validation' });
    },
    signout() {
      this.$store.dispatch('signout');
    }
  }
}
console.log("env => ", process.env)

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
