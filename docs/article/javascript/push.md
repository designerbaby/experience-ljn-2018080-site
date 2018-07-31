[参考链接](https://stackoverflow.com/questions/26273043/cannot-read-property-push-of-null)
当我们向一个空数组push一个对象的时候，会报错Cannot read property push of null
这时候，主要是因为数组为空的时候，会被识别为null。
这是应该先初始下数据,比如：
`this.group = this.group || []`