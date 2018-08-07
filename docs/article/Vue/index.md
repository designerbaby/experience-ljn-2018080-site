#### Vue.js 源码全方位解析

##### 原文档地址：[https://ustbhuangyi.github.io/vue-analysis/)

##### 一、提前认识Flow

 [源文档地址](https://ustbhuangyi.github.io/vue-analysis/prepare/flow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8-flow)
 使用flow可以进行静态类型检查，因为babel和eslint都有对应的flow插件来支持语法，可以沿用现在的构建配置。

##### 二、了解Vue.js源码目录

  从文档中分析[https://ustbhuangyi.github.io/vue-analysis/prepare/directory.html#compiler](https://ustbhuangyi.github.io/vue-analysis/prepare/directory.html#compiler)

  - 在src目录下：主要存放的都是源代码
  - compiler  # 编译相关
  - core      # 核心代码，包括内置组件、全局API封装、Vue实例化、观察者、虚拟DOM、工具函数等等。
  - platforms # 不同平台的支持
  - server    # 服务端渲染
  - sfc       # .vue文件解析
  - shared    # 共享代码,工具方法可以被浏览器端的Vue.js和服务端的Vue.js所共享的。
  

  - 在dist目录下，存放的就是生成的构建代码
  - 
  总的来说功能模块拆分的很清楚，相关的逻辑也放在独立的目录下，可以复用的代码也有独立目录。代码的阅读性和可维护性很强。

##### 三、重点讲解虚拟dom的实现（watch dom）


##### 四、还有MVVM是怎么实现的


##### 五、看源码的思路


##### 六、vue-router 和 vuex 插件源码分析

  vue-router和vuex都是通过插件的方式引入进来，然后进行使用，没有依靠在vue的框架中
  （接下来找时间写下）
##### 数据驱动
 
  - new 关键字在javascript语言中代表实例化是一个对象，Vue实际是一个类，类在javascript中是用Function实现的。
  - 可以在node-module,找到Vue的文件，并且加入debugger,进行断点调试。
  - proxy方法：对对象访问做一个劫持
  - Vitusl DOM就是用一个原生的JS对象去描述一个DOM节点,所以它比创建一个DOM的代价要小很多。
  - 在Vue.js中，Vitual DOM就是用VNode这么一个class去描述。
  - VNode是对真实DOM的一种抽象描述,它的核心定义主要是：标签名、数据、子节点、数值等。