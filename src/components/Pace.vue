<template>
  <div class="progressbar" :style="{ 'width': width + '%' }"></div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      width: 0,
      intervalId: null,
      startTime: 0,
      expireTime: 1000,// 5*60*60, // ms
    }
  },
  methods: {
    hide() {
      this.visible = false;
      this.width = 100;
      clearInterval(this.intervalId);
      this.width = 0;
    },
    show() {
      clearInterval(this.intervalId);
      this.visible = true;
      this.startTime = new Date().getTime();
      this.intervalId = setInterval(() => {
        if (new Date().getTime() > this.startTime + this.expireTime) {
          console.log('Expired waiting time!');
          return this.hide();
        }
        this.width++;
        this.width > 98 && (this.width = 99.5);
      }, 10);
    }
  },
  beforeMount() {
    // Register / listening 'show' event
    this.$pace.EventBus.$on('show-pace', () => {
      this.show();
    });
    this.$pace.EventBus.$on('hide-pace', () => {
      this.hide();
    });
  }
};

</script>

<style lang="scss" scoped>

.progressbar {
  height: 2px;
  background-color: $red;
}

</style>
