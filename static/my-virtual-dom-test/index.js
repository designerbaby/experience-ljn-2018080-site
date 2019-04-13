var svd = require('simple-virtual-dom')

var el = svd.el
var diff = svd.diff
var patch = svd.patch

var tree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li')])
])

var root = tree.render()

var newTree = el('div', {'id': 'container'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('ul', [el('li'), el('li')])
])

var patches = diff(tree, newTree)

patch(root, patches)