function MyObject () {
    this.xxx = 10
}
MyObject.prototype = new Object();
MyObject.prototype.constructor = MyObject;
obj = new MyObject();
obj.x = 100;

console.log(obj.x);
console.log(obj.xxx);
console.log(obj.toString());