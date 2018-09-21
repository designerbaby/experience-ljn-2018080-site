###### webpack 个人学习如何初体验

###### webpack 概述

webpack是js和小伙伴的打包器,可以打包模块,按需加载,loaders等等

###### webpack 版本迭代

 - V1 编译、打包、HMR（模块热更新）、代码分割、文件处理（loader、plugin）

 - V2 Tree Shaking(将没用的代码移除掉)、ES module、动态Import、新的文档

 - V3 Scope Hoisting(作用域提升)、Magic Comments(配合动态import使用)、

###### webpack 核心概念

 - Entry:代码的入口、打包的入口、单个或多个
 - Output:打包成的文件(bundle)、一个或多个、自定义规则、配合CDN
 - Loaders:处理除js以外的其他文件、转化为模块、babel-loader、ts-loader、style-loader等等
 - Plugins: 参与打包整个过程、打包优化和压缩、配置编译时的变量、及其灵活CommonsChunkPlugin（提取相同代码）、UglifyjsWebpackPlugin、功能相关htmlWebpackPlugin(生成html)、HotModuleReplacementPlugin(热模块、热更新)

 - 名词
    - Chunk: 代码块
    - Bundle: 一捆一束
    - Module: 模块
  
###### webpack 配置


