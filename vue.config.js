'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}



const port = process.env.port || process.env.npm_config_port || 80 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      '/api': {
        target: `http://ysyz.xczxb.com`,
        changeOrigin: true,
        pathRewrite: {
          '^/api' : '/api'
        }
      }
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",	//需要转换的单位，默认为"px"
            viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 3,		//单位转换后保留的精度
            propList: [		//能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw",		// 希望使用的视口单位
            fontViewportUnit: "vw",		//字体使用的视口单位
            selectorBlackList: ['van'],	//需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1,		//设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,		//媒体查询里的单位是否需要转换单位
            replace: true,		//是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/,		//忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    }
  }
}
