function Element (tagName, props, children) { // 构造Element的一个函数
    this.tagName = tagName
    this.props = props
    this.children = children
}

Element.prototype.render = function () { // 在原型上构建一个渲染函数，将这个ul渲染出来
    var el = document.createElement(this.tagName)  
    var props = this.props

    for (var propName in props) { // 设置节点的DOM属性
        var propValue = props[propName]
        el.setAttribute(propName, propValue)
    }

    var children = this.children || []

    children.forEach(function (child) {
        var childEl = (child instanceof Element) // 用来测试一个对象在其原型链中存在一个构造函数的prototype属性
    })

}



module.exports = function (tagName, props, children) {
    return new Element(tagName, props, children)
}
