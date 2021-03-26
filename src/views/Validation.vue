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
    <validator rules="required" v-slot="{ errors }">
      <div>
        <input name="email" type="password" v-model="email">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [password]</h3>
    <validator vid="password" rules="required" v-slot="{ errors }">
      <div>
        <input name="password" type="password" v-model="password">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [test]</h3>
    <validator rules="test" v-slot="{ errors }">
      <div>
        <input name="confirmation" type="text" v-model="confirmation">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [betweening]</h3>
    <validator rules="betweening:1,6" v-slot="{ errors }">
      <div>
        <input name="betweening" type="text" v-model="confirmation">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Rules: [required][model-less]</h3>
    <validator rules="required|image" v-slot="{ validate, errors }">
      <div>
        <input name="modelless" type="file" @change="validate">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <h3>Dynamic Rules: [required]</h3>
    <validator :rules="`${isRequired ? 'required' : ''}`" v-slot="{ errors }">
      <div>
        <input name="isRequired" type="text" v-model="isRequired">
        <br/>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </validator>

    <!-- <h3>Rules: [required]</h3>
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
    </validator> -->
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
    isRequired: true,
  }),
  created() {

  }
}
</script>
