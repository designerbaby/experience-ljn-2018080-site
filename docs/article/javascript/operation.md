### js 运行时的一些问题：
#### 包括作用域问题、函数覆盖问题、变量和函数提升问题

##### 一、 作用域问题

（1）全局作用域
   
        var x = 0;
        var f = function() {
            var x = 2;
        }
        f();
        alert(x); // 0

这个函数运行时，外面`alert(x)`拿到的是全局作用域中x的值,第一个声明的`var x=0;`的值是全局作用域中的值,第二个在f函数中声明的`var x=2`的值是局部作用域的值,因为用var重新声明了一个变量,两个指向的是不同的作用域，因此`alert(x)`返回的是0

（2）局部作用域

如果我们把var x=2;中的var去掉，变成下面这样子

        var x = 0;
        var f = function() {
            x = 2;
        }
        f();
        alert(x); // 2

出现这种情况是因为，`var x=0;`声明的是全局作用域的值，f()函数也是全局作用域，然后f函数中的值。x会覆盖掉外部的值，因此就会导致得到的值是2

  - 再来看一个例子

        var x = 2, y = 3;
        function f(i) {
            x = x + 1;
            y = y + 1;
            i = i + 10;
        }
        f(10);
        alert(x); // 3
        alert(y); // 4
        alert(i); // i is not defined

    这个也是因为x，y有声明并且在全局作用域中，这时就能得到x,y的值，而i是在f函数中命名的，在外部的全局中就不能调用到。

    如果将alert（）语句放在f函数中,值为3,4,20

##### 二、 函数覆盖问题
   
    来看一些函数覆盖的问题：

        var x = 0;
        var f = function f(){
            x = 1;
        }
        f();
        alert(x); // 1
        function f(){
            x = 2;
        }
        f();
        alert(x); // 1

    这里f函数将x的值置为1，然后虽然两次调用f（）函数，但是函数已经产生覆盖，第一个函数覆盖了第二个函数，因此两次调用都是1

    如果将上面的匿名函数f注释掉，如下

        var x = 0;
        f();
        alert(x); // 2
        function f(){
            x = 2;
        }
        f();
        alert(x); // 2

    这时，已经不发生函数覆盖，就一直是2,

    如果将命名函数注释掉

        var x = 0;
        var f = function f(){
            x = 1;
        }
        f();
        alert(x); // 1
        f();
        alert(x); // 1

    像这样，也不发生函数覆盖，也是只调用f函数、

    要解决函数覆盖的方法，就先写命名函数，再写匿名函数

        var x = 0;
        function f(){
            x = 2;
        }
        f();
        alert(x); // 2
        var f = function() {
            x = 1;
        }
        f();
        alert(x); // 1

    这样的话，命名函数f()先调用，匿名函数f后调用


 ** 总结：以后写函数时，尽量写成匿名函数形式，`var f = function(){}` **

##### 三、变量和函数提升问题

- 函数未定义
    `console.log(x);`  // x is not defined

    变量未定义，直接是undefined

- 函数已定义


    console.log(x);  // undefined
    var x = '123';
    console.log(x);  // 123;

这里声明了变量，js解释器**“前瞻性”**查找所有变量定义，把它们“提升”到函数顶部，就出现undefined，第一个未定义就出现undefined,第二个定义了就出现1223

- 内部变量重复定义


    var name = 'Baggins';
    (function() {
        console.log('Orginal name was:', name);   // Orginal name was: undefined
        var name = 'underhill';
        console.log('New name is:', name);        // New name is: underhill
    })();

这里使用了闭包函数，第一个name变量提升，就会出现undefined,本来可以访问到全局作用域的name，但是内部已经重新声明了，name变量提升，就会出现undefined。
这里典型的使用了**函数声明提前**，函数体内的块级作用域覆盖住了外部name的全局作用域，然后由于函数声明提升，相当于在函数体内，先`var name`;然后`console.log("Original name was"+name)`;然后`name = "Underhill";console.log("New name is" + name);`最后的值是一样的。

**因此，建议所有变量的定义，都放在头部，并使用var a=XX,b=xxx这样定义。**

- 函数直接调用


    isItHoisted();
    function isItHoisted() {
        console.log('Yes!');   // Yes
    }

这里函数直接调用就没什么好说的

- 函数定义提升

函数定义提升仅仅作用域函数定义，而不作用于函数表达式



这里函数definitionHoisted()，已经提升，而函数定义不作用于函数表达式，因此就抛出TypeError

- 命名函数表达式


    funcName();
    varName();
    var varName = function funcName() {
        console.log('Definition not hoisted!');
    }

在这里，函数名字是`funcName()`是函数的一部分，不会得到提升，而varName()也找不到这个方法

- 闭包函数与全局函数


    function f1() {
        var a = 999;
        nAdd = function() {
            a = a + 1;
        }
        function f2() {
            console.log(a);
        }
        return f2;
    }
    var result = f1();
    result();   // 999
    nAdd();     // 1000
    result();   // undefined

var result = f1();就调用了f1()函数，这时result即为f2,函数，result是全局变量

result()  调用完之后的值为999，这时就是调用了f2函数，并将值输出

nAdd()，调用完之后，这时nAdd()函数为全局函数，也是闭包函数，值为1000，

result()，这个调用f2函数，就输出1000.

- 闭包中的命名提升。


    function(a) {
        console.log(a);   // 1000
        a = 999;
        function(a) {
            console.log(a);  // 999
        }
    }(1000);

这里输出的值是999，因为1000传入进去，a的值被覆盖了，a变量命名提升，输出就是999；

- 函数覆盖问题


    var m = 1,j = k = 0;
    function add(n) {
        return n = n + 1;
    }
    y = add(m);
    function add(n) {
        return n = n + 3;  // 4
    }

在js函数中，是没有函数重载的，以前学java的时候，当函数名是相同的，主要传递的类型或者参数不同就会出现重载，两个都可以用，但是在js中

主要出现两个同名的函数，就会出现函数覆盖，第二个add函数，覆盖第一个add函数，然后，由于函数声明提前，就会直接将函数覆盖。

 
- 那么什么是函数声明提前呢？

!> 函数声明提前就是变量在变量声明之前就是已经可用，一般用在函数体内，在一个函数体内是块级作用域，一般函数，内部同名函数会覆盖外部同名函数，然后又由于函数声明提前，就可以有值。


?> That's all,Thank you!