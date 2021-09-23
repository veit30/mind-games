module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/styles.scss";
        `
      }
    }
  }
}
