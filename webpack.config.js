const existingForkTsChecker = require('ant-design-vue')
module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src')
    }
  },
  configureWebpack: config => {
    // get a reference to the existing ForkTsCheckerWebpackPlugin
    // copy the options from the original ForkTsCheckerWebpackPlugin
    // instance and add the memoryLimit property
    const forkTsCheckerOptions = existingForkTsChecker.options
    forkTsCheckerOptions.memoryLimit = 8192
  }
}
