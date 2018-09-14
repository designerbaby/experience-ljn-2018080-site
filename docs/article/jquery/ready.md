##### $(document).ready() 和 window.onload的区别

今天，来讲讲$(document).reday()和window.onload()的问题，这个问题已经是老生常谈了。

 - `window.onload` 是在页面中`所有元素加上所有资源`完成后才执行
 - `$(document).ready()` 中绑定的事件是在 `dom完全就绪时`就可以被调用。如果要`所有元素加载完` 就执行,就使用`$(window).load()` 给window对象绑定个方法，就可以在所有资源加载完毕后触发。
 - 因为`window.onload = function () {} ` 每次只能保存`对一个函数`的引用,会`覆盖`掉之前的函数，但是用`$(document).ready()`就可以追加新的行为。