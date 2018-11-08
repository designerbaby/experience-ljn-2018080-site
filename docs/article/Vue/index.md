#### Vue.js 源码全方位解析---虚拟dom的实现

##### 一、dom是什么？

  - DOM = Document Object Mode，就是一个文档对象类型。DOM可以以一种独立于平台和语言的方式访问和修改一个文档的内容和结构。
  - 真实的DOM 实际上是以面向对象方式描述的文档模型。
  - html本身就是一个dom, 平时用js操作html就是操作dom, HTML DOM 定义了所有 HTML 元素的对象和属性，以及访问它们的方法（接口）。
  - 但是js操作dom,性能很低,为什么呢？因为dom本身很多属性，一修改dom, 比如调用document.createElement。就会引发重排和重绘
  > 当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为重排。完成重排后，浏览器会重新绘制受影响的部分到屏幕，该过程称为重绘。
  - dom的本身就是一棵树，js的原生方法就是dom的操作方法

##### 二、虚拟dom是怎么实现的？

   - Vitusl DOM 本质上就是用一个原生的JS对象去描述一个DOM节点,所以它比创建一个DOM的代价要小很多。
   - 主要引入的是mvvm模式，让视图和状态进行绑定。状态变更了，视图自动变更，不用手动刷新页面。
   - MVVM 的模式如下： 当ViewModal对Model进行更新的时候，Binder会自动把数据更新到View上去;当用户对View进行操作时，Binder也会自动把数据更新到Model上去，这种称为： Two-way data-binding, *双向数据绑定*。
   - 了解MVVM模式
  <img src="images/vue/mvvm.png"> 
   -  为什么要用Virtual dom?
      -  DOM是很慢的。如果我们把一个简单的div元素的属性都打印出来，你会看到：
      <img src="images/Vue/dom.png">
   -  虚拟dom的算法步骤：
      -  用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
      -  当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
      -  把所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
   -  Virtual DOM 的本质：
      -  在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。  
   - 自我实现一个虚拟dom
  <img src="images/vue/vNode.jpg"> 

##### 三、Vue中是怎么实现虚拟dom的，跟基本的虚拟dom多了什么东西，为什么要加这些东西？、

  - Vue是怎么实现虚拟DOM的
    - Vue的原文档地址：[https://ustbhuangyi.github.io/vue-analysis/](https://ustbhuangyi.github.io/vue-analysis/)
    - 1、先了解下Vue.js源码目录

        目录设计：[https://ustbhuangyi.github.io/vue-analysis/prepare/directory.html#compiler](https://ustbhuangyi.github.io/vue-analysis/prepare/directory.html#compiler)

        - 在src目录下：主要存放的都是源代码
        - compiler  # 编译相关
        - core      # 核心代码，包括内置组件、全局API封装、Vue实例化、观察者、虚拟DOM、工具函数等等。
        - platforms # 不同平台的支持
        - server    # 服务端渲染
        - sfc       # .vue文件解析
        - shared    # 共享代码,工具方法可以被浏览器端的Vue.js和服务端的Vue.js所共享的。
        - 在dist目录下，存放的就是生成的构建代码
        - 总的来说功能模块拆分的很清楚，相关的逻辑也放在独立的目录下，可以复用的代码也有独立目录。代码的阅读性和可维护性很强。
  
    - 2、找到Vue中虚拟dom的源码
      - 在Vue.js中，Vitual DOM就是用VNode这么一个class去描述。 
      - VNode是对真实DOM的一种抽象描述,它的核心定义主要是：标签名、数据、子节点、数值等。
      - new 关键字在javascript语言中代表实例化是一个对象，Vue实际是一个类，类在javascript中是用Function实现的。
  - 跟基本的虚拟DOM多了什么东西
    - 1、
    - 2、

  - 为什么要加这些东西
    - 1、
    - 2、
 

  
 

##### 四、看源码的思路
  
##### 五、数据驱动
 
  - 可以在node-module,找到Vue的文件，并且加入debugger,进行断点调试。
  - proxy方法：对对象访问做一个劫持
 
##### 六、额外了解下Flow

 [源文档地址](https://ustbhuangyi.github.io/vue-analysis/prepare/flow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8-flow)
 使用flow可以进行静态类型检查，因为babel和eslint都有对应的flow插件来支持语法，可以沿用现在的构建配置

