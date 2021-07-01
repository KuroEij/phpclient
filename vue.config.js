// vue.config.js
// const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      // 只有碰到/api的才会执行代理
      '/client': {
          target: 'http://47.99.52.159', // 要访问的跨域的域名
          ws: true, // 是否启用websockets
          changeOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
      },
      '/heartlogs':{
        target: 'http://47.99.52.159',
        ws: true,
        changeOrigin: true 
      },
      '/list_clients':{
        target: 'http://47.99.52.159',
        ws: true, 
        changeOrigin: true 
      },
      '/delete_clients':{
        target: 'http://47.99.52.159',
        ws: true, 
        changeOrigin: true 
      },    
      '/delete_files':{
        target: 'http://47.99.52.159',
        ws: true, 
        changeOrigin: true 
      },   
      '/login':{
        target: 'http://47.99.52.159',
        ws: true, 
        changeOrigin: true 
      }, 
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        './src/assets/styles/imports.less',
      ],
    },
  }
}
