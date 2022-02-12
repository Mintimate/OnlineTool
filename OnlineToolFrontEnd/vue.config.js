let JavaBaseURL = "http://localhost:8083"  //开发环境url
let PythonBaseURL = "http://localhost:8099"  //开发环境url
let GithubSpeedURL = "URL"

const path = require("path");
// 如果使用webpack5 且使用prerender-spa-plugin非prerender-spa-plugin-next
// const PrerenderSPAPlugin = require("prerender-spa-plugin");

const sitemapWebpackPlugin = require('sitemap-webpack-plugin').default

const webpack = require('webpack')
// const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

let routes = [
  '/', '/processIMG/', '/statisticsChars/', '/generatePWD/', '/calculateTheDate/',
  '/randomNumber/', '/textBase64/', '/curl/', '/mcstatus/',
  '/gh/', '/about/', '/mdv/', '/oneindexM/'
]

let my_proxy = {
  '/dataApiJava': {
    target: JavaBaseURL,
    pathRewrite: {'^/dataApiJava': ""},
    ws: true,
    changeOrigin: true
  },
  '/dataApiPython': {
    target: PythonBaseURL,
    pathRewrite: {'^/dataApiPython': ""},
    ws: true,
    changeOrigin: true
  },
  '/ghs': {
    target: GithubSpeedURL,
    pathRewrite: {'^/ghs': ""},
    ws: true,
    changeOrigin: true
  }
}

module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vue-meta'],
  chainWebpack: config => {
    if (process.env.NODE_ENV == "development") {
      config.devServer.proxy(
        my_proxy
      )
    }
    if (process.env.NODE_ENV == "production") {
      // config.plugin("PrerenderSPAPlugin").use('prerender-spa-plugin', [
      //   {
      //     staticDir: path.join(__dirname, 'dist'),
      //     routes: routes,
      //     renderer: new PuppeteerRenderer({
      //       headless: true,
      //       executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      //       // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
      //       renderAfterDocumentEvent: 'render-event',
      //     }),
      //     server: {
      //       proxy: my_proxy
      //     }
      //   }])
      config.plugin("PrerenderSPAPlugin").use('prerender-spa-plugin-next', [
        {
          indexPath: 'index.html',
          routes: routes,
          postProcess(renderedRoute) {
            renderedRoute.route = renderedRoute.originalRoute
            // Basic whitespace removal. (Don't use this in production.)
            renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><')
            // Remove /index.html from the output path if the dir name ends with a .html file extension.
            // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
            }
            return renderedRoute
          },
          renderer: require('@prerenderer/renderer-puppeteer'),
          renderAfterDocumentEvent: 'render-event',
          server: {
            proxy: my_proxy
          },
          headless: false
        }])
      config.plugin("sitemap").use(sitemapWebpackPlugin, [
        {
          base: 'https://tool.mintimate.cn',
          paths: routes,
          options: {
            filename: 'sitemap.xml',
            lastMod: true,
            changefreq: 'monthly'
          },
        }
      ])

      config.plugin("CompressionPlugin").use('compression-webpack-plugin', [{
        filename: '[path][base].gz',
        compressionOptions: {
          // 压缩级别
          level: 9
        },
        algorithm: 'gzip',
        // 要压缩的文件（正则）
        test: productionGzipExtensions,
        // 排除
        exclude:/index.html/,
        minRatio: 0.8,
        deleteOriginalAssets:true
      }
      ])
    }
  }

  /**
   configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: [
                    '/',
                    '/processIMG',
                    '/statisticsChars',
                    '/generatePWD',
                    '/calculateTheDate',
                    '/randomNumber',
                    '/textBase64',
                    '/curl',
                    '/mcstatus',
                    '/gh',
                    '/about',
                    '/mdv'
                ],
                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    headless: true,
                    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                    renderAfterDocumentEvent: 'render-event',
                }),
            }),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            // 下面两项配置才是 compression-webpack-plugin 压缩配置
            // 压缩成 .gz 文件
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
            new CompressionPlugin({
                filename: '[path][base].br',
                algorithm: 'brotliCompress',
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 11
                    }
                },
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    }
   **/
}
