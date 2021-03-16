<template>
  <div class="about">
    <h1>This is an validation page</h1>

    <div>
      <h3>Locolization</h3>
      <p>{{ trans('name') }}</p>
      <p>{{ t('common.yes') }}</p>
      <p>{{ __('common.no') }}</p>
    </div>

    <h3>Rules: [required|secret]</h3>
    <validator vid="email" name="E-mail Address" rules="required|secret" v-slot="{ errors }">
      <div>
        <input name="email" type="text" v-model="email">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [required|secret]</h3>
    <validator rules="required|password:@confirm" v-slot="{ errors }">
      <div>
        <input type="password" v-model="password">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [required]</h3>
    <validator name="confirm" rules="required" v-slot="{ errors }">
      <div>
        <input type="password" v-model="confirmation">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [required]</h3>
    <validator name="testing" rules="required" v-slot="{ errors }">
      <div>
        <input type="text">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [dimensions:10,30]</h3>
    <validator name="testing" rules="dimensions:10,30" v-slot="{ errors }">
      <div>
        <input type="text" v-model="image">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data: () => ({
    email: null,
    confirmation: null,
    password: null,
    testing: null,
    image: 'image',
  }),
}
</script>
