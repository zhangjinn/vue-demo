/**
 * Created by zhangjinjin on 2018/12/7.
 */
// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊


const goods=require('./mock/goodslist.json');
const foodMenu=require('./mock/foodMenu.json');
const rateMenu=require('./mock/rateMenu.json');
module.exports = {
    //baseUrl  type:{string} default:'/'
    //baseUrl:'./',
    // 将部署应用程序的基本URL
    // 将部署应用程序的基本URL。
    // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

    baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',

    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

    // outputDir: 'dist',

    // pages:{ type:Object,Default:undfind }
    /*
     构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
     个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
     的字符串，
     注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
     */
    // pages: {
    // index: {
    // entry for the page
    // entry: 'src/index/main.js',
    // the source template
    // template: 'public/index.html',
    // output as dist/index.html
    // filename: 'index.html'
    // },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    //lintOnSave: true,// eslint-loader 是否在保存的时候检查
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    //productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    css: {
        loaderOptions: {
          less: {
            modifyVars: {
              red: '#03a9f4',
              blue: '#3eaf7c',
              orange: '#f08d49',
              'text-color': '#111'
            }
          },
          stylus: {
            'resolve url': true,
            'import': [
              './src/theme'
            ]
          }
        }
    },

    devServer: {
        port: 8088, // 端口号
        //host: "0.0.0.0",
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: { // 配置多个代理

            '/foo': {
                target: 'http://rap2api.taobao.org', // 代理接口 // 需要请求的地址
                ws: true,
                changeOrigin: true, //开启代理
                pathRewrite: {  //使用/foo 来代替http://rap2api.taobao.org/app/mock
                    '^/foo': '/app/mock/122056' //代理路径
                }
            },

            '/shop': {
                target: 'http://47.96.154.94',
                ws: true,
                changeOrigin: true
            }

        },
        before(app){//配置本地的json,json文件和src同级
            //http://localhost:8089/api/goods
            app.get('/api/goods', (req, res) => {
                res.json({
                    errno: 0,
                    info: goods
                })
            }),
            app.get('/api/foodMenu', (req, res) => {
                res.json({
                    errno: 0,
                    info: foodMenu
                })
            }),
            app.get('/api/rateMenu', (req, res) => {
                res.json({
                    errno: 0,
                    info: rateMenu
                })
            })
        }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
};
