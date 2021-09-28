const existingForkTsChecker = require('ant-design-vue')
const { VueLoaderPlugin } = require('vue-loader')
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
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          'vue-svg-loader'
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
