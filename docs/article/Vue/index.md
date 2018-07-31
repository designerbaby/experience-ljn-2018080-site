#### Vue.js 源码全方位解析

##### 原文档地址：[https://ustbhuangyi.github.io/vue-analysis/)

##### 一、提前认识Flow

 [源文档地址](https://ustbhuangyi.github.io/vue-analysis/prepare/flow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8-flow)
 使用flow可以进行静态类型检查，因为babel和eslint都有对应的flow插件来支持语法，可以沿用现在的构建配置。

##### 数据驱动
 
  - new 关键字在javascript语言中代表实例化是一个对象，Vue实际是一个类，类在javascript中是用Function实现的。
  - 可以在node-module,找到Vue的文件，并且加入debugger,进行断点调试。
  - proxy方法：对对象访问做一个劫持
  - Vitusl DOM就是用一个原生的JS对象去描述一个DOM节点,所以它比创建一个DOM的代价要小很多。
  - 在Vue.js中，Vitual DOM就是用VNode这么一个class去描述。
  - VNode是对真实DOM的一种抽象描述,它的核心定义主要是：标签名、数据、子节点、数值等。