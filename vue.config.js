module.exports = {
  css: {
    loaderOptions: {
      // Loading *.scss files automatically for accessing at global
      scss: {
        prependData: `@import "~@/assets/styles/global.scss";`
      }
    }
  }
};
