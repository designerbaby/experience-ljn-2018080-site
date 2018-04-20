#### 深入探究js的原型与原型链

最近在看《javascript高级程序设计》，看完之后，觉得感触，然后我今天又看到了一篇文章，说的很搞笑。就想整理下自己所学的。

首先，如果我们把ECMAScript的对象想象为散列表，即一组名值对，其中值可以是数据或函数。

那究竟对象、原型对象、构造函数、继承、原型链、 原型属性的共享、原型的动态性、原型的整体重写呢，来一组简单粗暴的描述哈，还是挺搞笑的。

1）人是人他妈生的，妖是妖他妈生的。人和妖都是对象实例，而人他妈和妖他妈就是原型。原型也是对象，叫原型对象。

2）人他妈和人他爸啪啪啪能生出一堆人宝宝、妖他妈和妖他爸啪啪啪能生出一堆妖宝宝，啪啪啪就是构造函数，俗称造人。

3）人他妈会记录啪啪啪的信息，所以可以通过人他妈找到啪啪啪的信息，也就是说能通过原型对象找到构造函数。

4）人他妈可以生很多宝宝，但这些宝宝只有一个妈妈，这就是原型的唯一性。

5）人他妈也是由人他妈他妈生的，通过人他妈找到人他妈他妈，再通过人他妈他妈找到人他妈他妈……，这个关系叫做原型链。

6）原型链并不是无限的，当你通过人他妈一直往上找，最后发现你会发现人他妈他妈他妈……的他妈都不是人，也就是原型链最终指向null。

7）人他妈生的人会有人的样子，妖他妈生的妖会有妖的丑陋，这叫继承。

8）你继承了你妈的肤色，你妈继承了你妈他妈的肤色，你妈他妈……，这就是原型链的继承。

9）你谈对象了，她妈让你带上房产证去提货，你若没有，那她妈会问你妈有没有，你妈没有那她妈会问你妈她妈有没有……这就是原型链的向上搜索。

10）你会继承你妈的样子，但是你也可以去染发洗剪吹，就是说对象的属性可以自定义，会覆盖继承得到的属性。

11）虽然你洗剪吹了染成黄毛了，但你不能改变你妈的样子，你妈生的弟弟妹妹跟你的黄毛洗剪吹没一点关系，就是说对象实例不能改动原型的属性。

12）但是你家被你玩火烧了的话，那就是说你家你妈家你弟们家都被烧了，这就是原型属性的共享。

13）你妈外号阿珍，邻居大娘都叫你阿珍儿，但你妈头发从飘柔做成了金毛狮王后，隔壁大婶都改口叫你包租仔，这叫原型的动态性。

14）你妈爱美，又跑到韩国整形，整到你妈他妈都认不出来，即使你妈头发换回飘柔了，但隔壁邻居还是叫你金毛狮王子。因为没人认出你妈，整形后的你妈已经回炉再造了，这就是原型的整体重写。

 哈哈，是不是简单粗暴，还特别容易理解。

ECMAScript中有两种属性：数据属性和访问器属性
（1）数据属性：

  - [[Configurable]] 表示能否通过delete删除属性从而重新定义属性，能否修改属性，或者能否把属性修改为访问器属性
  - [[Enumerable]] 表示能够通过for-in循环返回属性
  - [[Writable]]表示能否修改属性的值
  - [[Value]]包含这个属性的数据值，
修改默认的属性使用 Object.defineProperty() 这个方法

（2）访问器属性：包含getter和setter函数。getter：负责返回有效的值，setter函数传入新值，访问器属性的4个特性：
  - [[Configurable]]表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为数据属性。默认为true.
  - [[Enumerable]]表示能否通过for-in循环返回属性。
  - [[Get]]在读取属性时调用的函数，默认值为undefined
  - [[Set]]在写入属性时调用的函数，默认值为undefined

访问器的属性用`Object.defineProperty()`来定义

书上给了一个例子，来挺好理解的：
```
var book = {
　　_year:2004,
　　//_year前面的下划线是一种常用的记号，**用来表示只能通过对象方法访问的属性**
　　edition:1
};
Object.defineProperty(book,"year",{
　　get:function(){
　　　　return this._year;
　　}
　　set:function(newYear){
　　　　if(newValue >2004){
　　　　　　this._year = newValue;
　　　　　　this.edition += newValue -2004;
　　　　}
　　}
});
```
//定义访问器的旧有方法
```
book.__defineGetter__("year",function(){
　　return this._year;
})
book.__defineSetter__("year",function(newValue){
　　if(newValue >2014){
　　　　this._year = newValue;
　　　　this.edition += newValue -2004;
　　}
})
book.year = 2015;
alert(book.edition); //2
```
读取属性的特性：`Object.getOwnPropertyDesciptor()`取得给定属性的描述符。

最后说回原型链：原型链继承的主要问题在于属性的共享，很多时候我们只想共享方法而并不想要共享属性，理想中每个实例应该有独立的属性。因此，原型继承就有了下面的两种改良方式：

1）组合继承
```
function Mother(age){
　　this.age = age;
　　this.bobby = ['running','football']
}

Mother.prototype.showAge = function(){
　　console.log(this.age);
};

function Person(name,age){
　　Mother.call(this.age);         //第二次执行
　　this.name = name;
}

Person.prototype = new Mother();    //第一次执行
Person.prototype.constructor = Person;
Person.prototype.showName = function(){
console.log(this.name);
}
var p1 = new Person('Jack',20);
p1.hobby.push('basketball'); //p1:'Jack';_proto_:20,['running','football']
var p2 = new Person('Mark',18); //p2:'Mark';_proto_:18,['running','football']
```
(2)寄生组合式继承
```
function object(o){
　　function F(){}
　　F.prototype = o;
　　return new F();
}

function inheritPrototype(Person,Mother){
　　var prototype = object(Mother.prototype);
　　prototype.constructor = Person;
　　Person.prototype = prototype;
}

function Mother(age){
　　this.age = age;
　　this.hobby = ['running','football']
}

Mother.prototype.showAge = function(){
　　console.log(this.age);
};

function Person(name,age){
　　Mother.call(this,age);
　　this.name = name;
}

inheritPrototype(Person,Mother);
Person.prototype.showName = function(){
console.log(this.name);
}

var p1 = new Person('Jack',20);
p1.hobby.push('backetball');    //p1:'Jack';_proto_:20,['running','football']
var p2 = new Person('Mark',18); //p2:'Mark';_proto_:18,['running','football']
```
js创建对象的各种方法

（1）原型模式

//1原型模式：对象字面量方式
```
var person = {

　　name : 'Jack',

　　age:18,

　　sayName:function(){alert(this.name);}

};
```

//2原型模式：Object构造函数方式
```
var person = new Object();

person.name = 'Jack';

person.age = 18;

person.sayName = function(){

　　　alert(this.name);　

};
```
(2)工厂模式

//工厂模式，定义一个函数创建对象
```
function creatPerson(name,age){

　　var person = new Object();

　　person.name = name;

　　person.age = age;

　　person.sayName = function(){

　　　　alert(this.name);

　　};

　　return person;

}
```
工厂模式就是批量化生产，简单调用就可以进入造人模式（啪啪啪。。。）指定姓名年龄就可以造一堆小宝宝啦，解放双手。但是由于是工厂暗箱操作的，所以你不能识别这个对象到底是什么类型、是人还是狗傻傻分不清（instanceof 测试为 Object），另外每次造人时都要创建一个独立的temp对象，代码臃肿

（3）构造函数

//3构造函数模式，为对象定义一个构造函数
```
function Person(name,age){

　　this.name = name;

　　this.age = age;

　　this.sayName = function(){
　　　　alert(this.name);
　　};
}

var p1 = new Person('Jack',18);    //创建一个p1对象

Person('Jack',18);
```
构造函数与C++、JAVA中类的构造函数类似，易于理解，另外Person可以作为类型识别（instanceof 测试为 Person 、Object）。但是所有实例依然是独立的，不同实例的方法其实是不同的函数。这里把函数两个字忘了吧，把sayName当做一个对象就好理解了，就是说张三的 sayName 和李四的 sayName是不同的存在，但显然我们期望的是共用一个 sayName 以节省内存。

(4)原型模式

//原型模式，直接定义prototype属性
```
function Person(){}

Person.prototype.name = 'Jack';

Person.prototype.age = 18;

Person.prototype.sayName = function(){alert(this.name);};
```
//原型模式。字面量定义方式
```
function Person(){}

Person.prototype = {

　　name:'Jack',

　　age:18,

　　sayName:function(){alert(this.name);}

};

var p1 = new Person();  //name = 'Jack'

var p2 = new Person(); //name = 'Jack'
```
这里需要注意的是原型属性和方法的共享，即所有实例中都只是引用原型中的属性方法，任何一个地方产生的改动会引起其他实例的变化。

 (5)混合模式

//原型构造函数组合模式
```
function Person(name,age){

　　this.name = name;

　　this.age = age;

}

Person.prototype = {

　　hobby:['running','football'];

　　sayName:function(){alert(this.name);},

　　sayAge:function(){alert(this.age);}

}

var p1 = new Person('Jack',20);

var p2 = new Person('Mark',18);
```
做法是将需要独立的属性方法放入构造函数中，而可以共享的部分则放入原型中，这样做可以最大限度节省内存而又保留对象实例的独立性。