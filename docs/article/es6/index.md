###### es6的十种特性

 - 查询es6的支持性的链接：[http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)
###### 特性一: 块级作用域
   - {}代表一个块级作用域。作用域嵌套时外层代码块不受内层代码块的影响。立即执行匿名函数（IIFE）原本的作用是为了形成局部作用域，防止变量污染，块级作用域的的出现使得获得广泛应用的立即执行匿名函数不再必要了。
   - let命令：let不会像var一样声明提前，只能在定义之后使用，之前使用会抛出ReferenceError; 函数的作用域是其声明时所在的作用域。不能在函数内部重新声明参数。
   - const命令：只是指向变量所在的`地址`，如果将const变量赋值为一个对象，则此常量储存的是一个`地址`，不可变的只是这个`地址`，但对象本身是可变的，依然可以为其添加新属性。如果真的想将对象冻结，应该使用Object.freeze方法。
   - let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。
###### 特性二: 变量的解构赋值
   - 按照一定模式，从数组和对象中提取值，对变量进行赋值，解构只能用于数组或对象
###### 特性三：字符串的扩展
   - 字符串处理的增强：增强了对码点大于0xFFFF的字符的整体处理和正则匹配。
      - codePointAt()：会正确返回四字节的UTF-16字符的码点，对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。
      - String.fromCodePoint()：正确返回编号大于0xFFFF的码点对应的字符，弥补了String.fromCharCode方法的不足。
      - at()：返回字符串给定位置的字符，如果该字符的Unicode编号大于0xFFFF，可以返回正确的字符。而charAt()方法只能返回UTF-16编码的第一个字节，不能正确返回。
      - 字符的Unicode表示法："\u{20BB7}"的形式可以正确表示超出\uFFFF的双字节字符。
      - 正则表达式的u修饰符：对于正则表达式中的.字符、\u{20BB7}大括号字符、量词、\S、i修饰符等，如果需要正确识别码点编号大于0xFFFF的字符，必须添加了u修饰符。
      - normalize()：ES6提供String.prototype.normalize()方法，用来将Unicode中字符的不同表示方法统一为同样的形式。
      - includes()：返回布尔值，表示是否找到了参数字符串。支持第二个参数，表示开始搜索的位置。
      - startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。支持第二个参数，表示开始搜索的位置。
      - endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。支持第二个参数，表示对前n个字符进行搜索。
      - repeat()：返回一个新字符串，表示将原字符串重复n次。
   - 模板字符串：它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
###### 特性四：数值的扩展
   - 二进制和八进制使用新的写法, 分别用前缀0b和0o表示
   - 扩展函数：引入了很多新的函数
      -  Number.isFinite()用来检查一个数值是否非无穷（infinity）；Number.isNaN()用来检查一个值是否为NaN。它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
      -  Number.parseInt(), Number.parseFloat()：ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。 
      -  Number.isSafeInteger()则是用来判断一个整数是否落在Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量表示的上下限范围内。
      -  Math.trunc(x)方法用于去除一个数的小数部分，返回整数部分；
      -  Math.sign(x)方法用来判断一个数到底是正数、负数、还是零；
      -  Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）；
      -  Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）；
      -  Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）；
      -  Math.cbrt(x) 返回x的立方根；
      -  Math.clz32(x) 返回x的32位二进制整数表示形式的前导0的个数；
      -  Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）；
      -  Math.expm1(x) 返回eˆx - 1；
      -  Math.fround(x) 返回x的单精度浮点数形式；
      -  Math.hypot(...values) 返回所有参数的平方和的平方根；
      -  Math.imul(x, y) 返回两个参数以32位整数形式相乘的结果；
      -  Math.log1p(x) 返回1 + x的自然对数；
      -  Math.log10(x) 返回以10为底的x的对数；
      -  Math.log2(x) 返回以2为底的x的对数；
      -  Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）。
###### 特性五： 数组的扩展 
   - 数组推导
      - 直接通过现有数组生成新数组的一种简化写法，通过for...of结构，允许多重循环
        ```
        var a1 = [1, 2, 3, 4];
        var a2 = [for (i of a1) i * 2];
        a2 // [2, 4, 6, 8]
        ```
   - 数组处理的扩展方法
      -   Array.from()：用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象，其中包括ES6新增的Set和Map结构。Array.from()还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理。
      -   Array.of()方法用于将一组值，转换为数组。弥补数组构造函数Array()的不足。
      -   数组实例的find()用于找出第一个符合条件的数组元素；数组实例的findIndex()用于返回第一个符合条件的数组元素的位置。这两个方法都可以发现NaN，弥补了IndexOf()的不足。
      -   数组实例的fill()使用给定值，填充一个数组。
      -   数组实例的entries()，keys()和values()用于遍历数组，它们都返回一个遍历器，可以用for...of循环进行遍历。keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
      -   ES6允许直接写入变量和函数，作为对象的属性和方法。
      -   ES6允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内，允许变量渗入 key 中。
      -   Object.is()：用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
      -   Object.assign()：用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
      -   proto属性: 用来读取或设置当前对象的prototype对象。
      -   Object.setPrototypeOf()方法的作用与proto相同，用来设置一个对象的prototype对象，它是ES6正式推荐的设置原型对象的方法。
      -   Object.getPrototypeOf()方法用于读取一个对象的prototype对象。（浏览器（包括IE11）早就部署了这个属性，只是在 ES6 才被纳入标准中，之前我们常用这个属性来判断是否为 IE 。）
      -   Symbol是一种新的原始数据类型，表示独一无二的ID，它通过Symbol函数生成。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。Symbol函数可以接受一个字符串作为参数，表示Symbol实例的名称。
      -   Symbol.for()：在全局环境中搜索指定key的Symbol值，如果存在就返回这个Symbol值，否则就新建一个指定key的Symbol值并返回。与Symbol()的区别是，Symbol.for()会被登记在全局环境中供搜索，不会建立相同Key的Symbol值，而Symbol()则完全相反。
      -   Symbol.keyFor()方法返回一个已登记的Symbol类型值的key。
      -   Symbol作为属性名，该属性不会出现在for...in循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回，要使用对应的Object.getOwnPropertySymbols方法，以及Object.getOwnPropertyKeys方法获取相应的Symbol属性名。

###### 特性六：Proxy

   - Proxy用于修改某些操作的默认行为，等于在目标对象之前，架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。而Proxy.revocable()方法则返回一个可取消的Proxy实例。

###### 特性七： 函数的扩展

   - 函数参数的默认值,所指的作用于是函数作用域,指定了默认值后,返回没有默认值的参数个数
   - 可以设置双重默认值
   - rest 运算符
    - ...+变量名：将多余的参数放入一个数组中,rest参数必须在最后一个
        ```
            function add(...values) {
                let sum = 0;

                for (var val of values) {
                    sum += val;
                }

                return sum;
            }

            add(2, 5, 3) // 10
        ```
    - ...数组： 将一个数组转为用逗号分隔的参数序列
    -  const date = new Date(...[2015, 1, 1]);

   - 箭头函数 =>
     - 函数定义的简化表示法，函数体内的this对象，绑定定义时所在的对象,而不是使用时所在的对象
     - 不可以当做构造函数,不可以使用new
     - 不可以使用arguments对象,该对象在函数体内不存在

   - 尾调用优化
     - 尾调用的应用——尾递归：递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，

     ```
        function factorial(n, total) {
            if (n === 1) return total;
            return factorial(n - 1, n * total);
        }

        factorial(5, 1) // 120
     ```

###### 特性八：Set和Map数据结构

   - Set:Set结构类似于数组，但是成员的值都是唯一的，没有重复的值
   - 注意：向Set加入值的时候，不会发生类型转换，所以5和“5”是两个不同的值。Set内部判断两个值是否不同，使用的算法类似于精确相等运算符（===），唯一的例外是NaN等于自身。这意味着，两个对象总是不相等的。
   - Map:Map结构类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

###### 特性九： 遍历器 Iterator

   - 所谓Iterator接口，就是指调用这个接口，会返回一个遍历器对象。该对象具备next方法，每次调用该方法，会返回一个具有value和done两个属性的新对象，指向部署了Iterator接口的数据结构的一个成员。

   ```
       function idMaker(){
            var index = 0;

            return {
                next: function(){
                return {value: index++, done: false};
                }
            }
        }

        var it = idMaker();

        it.next().value // '0'
        it.next().value // '1'
        it.next().value // '2' 
   ```
   - for...of 
   - 当使用for...of循环，遍历某种数据结构时，该循环会自动去寻找Iterator接口。在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
   - 首先是上面介绍的for...of结构；
    对数组和Set结构进行解构赋值时，会默认调用iterator接口；
    扩展运算符（...）也会调用默认的iterator接口；
    yield*
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()
    Promise.all(), Promise.race()

###### 特性十：Generator函数

###### 特性十一：Promise对象

  - 一个构造函数，用来生成Promise实例。Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve方法和reject方法。
    - 如果异步操作成功，则用resolve方法将Promise对象的状态变为“成功”（即从pending变为resolved）；
    - 如果异步操作失败，则用reject方法将状态变为“失败”（即从pending变为rejected）。
    - promise实例生成以后,可以用then方法分别指定resolve方法和reject方法的回调函数
   
     ```
        var promise = new Promise(function(resolve, reject) {
            if (/* 异步操作成功 */){
                resolve(value);
            } else {
                reject(error);
            }
        });

        promise.then(function(value) {
            // success
        }, function(value) {
            // failure
        });
     ```
    - Promise.prototype.then方法返回的是一个新的Promise对象，因此可以采用链式写法。多个then执行时前一个回调函数完成以后，会将返回结果作为参数，传入后一个回调函数。如果前一个回调函数返回的是Promise对象，这时后一个回调函数就会等待该Promise对象有了运行结果，才会进一步调用。

    ```
        getJSON("/posts.json").then(function(posts) {
            // some code
        }).catch(function(error) {
            // 处理前一个回调函数运行时发生的错误
            console.log('发生错误！', error);
        });
    ```

###### 特性十二： Class
 
   - class基本语法：Class定义了一个“类”，constructor方法表示构造方法，而this关键字则代表实例对象。
   - Point.prototype在ES6继续存在，也就是说，除了constructor方法以外，类的方法都定义在类的prototype属性上面。

   ```
        //定义类
        class Point {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return '('+this.x+', '+this.y+')';
        }

        }
   ```
   - 继承：Class之间可以通过extends关键字，实现继承。

###### 特性十三：Module
   
   - export命令显示指定输出的代码，输入时也采用静态命令的形式
  
    `export {firstName, lastName, year}`
    `import {firstName, lastName, year} from './profile'`
   - module命令行可以取代import语句,达到整体输入模块的作用

    ```
        export function area(radius) {
            return Math.PI * radius * radius;
        }

    ```
    `module circle from 'circle';`
   - export default 命令定义模块的默认方法

    ```
    export default function () {
        console.log('foo');
    }
    ```
   - 模块的继承
    `export * from 'circle';`
