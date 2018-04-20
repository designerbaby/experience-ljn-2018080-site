###  mpVue的介绍

1. mpVue是什么？

  （1）mpVue是一个使用Vue.js开发小程序的前端框架,基于Vue.js,mpVue修改了Vue.js的runtime和compiler实现,使其可以运行在小程序中。

  （2）mpVue的主要特性
   - 彻底的组件化开发能力：提高代码复用性
   - 完整的 Vue.js 开发体验
   - 方便的 Vuex 数据管理方案：方便构建复杂应用
   - 快捷的 webpack 构建机制：自定义构建策略、开发阶段 hotReload
   - 支持使用 npm 外部依赖
   - 使用 Vue.js 命令行工具 vue-cli 快速初始化项目
   - H5 代码转换编译成小程序目标代码的能力
   （3）mpVue的一些配套设施：
   - [mpVue-loader](http://mpvue.com/build/mpvue-loader/) 是 [vue-loader](https://github.com/vuejs/vue-loader)的一个扩展延伸版。增加了一些构建到微信小程序的若干能力。
   （4）框架原理
   - mpVue 保留了**vue.runtime**的核心方法,无缝继承了Vue.js的基础能力
   - **mpvue-template-compiler** 提供了将vue的模板语言转换成wxml语法的能力。
   - 修改vue的建构配置，使之构建出符合小程序项目结构的代码格式：json/wxml/wxss/js文件
2. 为什么要有mpVue？
    - 继承自Vue.js,其技术规范和语法特点都与[Vue.js](https://cn.vuejs.org/v2/guide/)保持一致
3. 怎么使用mpVue?

    - 使用mpVue官网的[五分钟上手教程](http://mpvue.com/mpvue/quickstart/),指定taobao源,然后全局安装,初始化一个新项目,最后安装依赖就可以了。
    - 使用小程序专门的[微信开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html),搭建小程序的开发环境。
    - 再编写代码,运行`npm run dev`进行编译，用微信开发工具打开dist目录,就可以在线调试。**勾选工具右边的ES6转ES5**,因为mpVue框架没自己直接转成ES5。或者自己加入插件进行配置。
4. [mpVue](http://mpvue.com/mpvue/)和[wepy](https://github.com/Tencent/wepy)的区别

    - 使用上的区别： 

（1）比如要获取小程序在page onLoad时候传递的options时，mpVue是使用`this.$root.$mp.query`进行获取。而wepy中要用到在[微信小程序的Api](https://developers.weixin.qq.com/miniprogram/dev/api/)，使用onLoad方法,在Page和Component共用的生命周期函数进行获取,比如：


        onLoad(option) {
            console.log(option);
        }

（2）小程序中在app onLaunch/onShow时候传递的options时,是使用`this.$root.$mp.appOptions`进行获取,而在wepy中也是用onShow(){},这是在Page中存在的页面生命周期函数。比如：


        onShow() {
            console.log('onShow')
        } 

（3）捕获app的onError,mpVue是在app的根组件上添加名为onError的回调函数如下：

        export default {
            onLaunch() {
            },
            // 捕获app error
            onError(err) {
                console.log(err)
            }
        }

   - 模板语法: 几乎使用官方文档的模板语法。
- 