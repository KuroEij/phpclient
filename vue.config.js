// vue.config.js
// const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        './src/assets/styles/imports.less',
      ],
    },
  }
}
