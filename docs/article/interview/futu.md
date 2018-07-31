
### 富途证券面试题目

##### js基本数据类型有哪些 
  
  Number、String、Boolean、Null、Undefined、Symbol类型、Object

##### 正则的捕获组与非捕获组 

  - 捕获组就是把正则表达式中子表达式匹配的内容,保存到内存中以数组编号或显式命名的组里，方便后面引用
  ```
    例如： /(a)(b)(c)/中的捕获组编号为
    组0： abc 
    组1： a
    组2： b
    组3： c
  ```
  - 非捕获组：非必要使用()。降低内存浪费 `?: 可以声明一个子表达式为非捕获组`

  ```
    例如： 
    var str = 'abcd0123ABCD';
    var reg = /(?:[a-z]+)(\d+)([A-Z]+)/g;
    reg.test(str); // true
    console.log(RegExp.$0); // undefined
    console.log(RegExp.$1); // 0123
    console.log(RegExp.$2); // ABCD
  ```
  (?:[a-z]+)将这个子表达式声明成了非捕获组

##### webpack的entry可以是什么数据类型，区别是什么 

  - 对象，字符串，数组
  - 字符串和数组是对象的简化版
  ```
    字符串 entry: './app.js'  等价于 entry: { main: './app.js' }
    数组 entry:['./app.js', 'lodash'] 等价于 entry: { main: ['./app.js', 'lodash'] }
  ```
##### 定时器函数是什么时候放到异步队列中去的 

    定时触发线程产生了一个异步定时事件并放到任务队列
    <img src="images/interview/jstimer.jpg"> 

##### 对闭包的理解 

    闭包就是能够读取其他函数内部变量的函数,可以让这些变量的值始终保持在内存中。
    闭包能够将函数内部和函数外部连接起来

  ```
    例子：
    var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
   输出The Window  因为闭包中,方法都暴露在外面
  ```


  ```
    var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());
    输出 My Object  在内部函数中,形成一个闭包,没有暴露在外面
  ```

##### 原型链的理解

  - prototype 属性,函数才有，当创建函数时,js会为这个函数添加prototype属性,一个有constructor属性的对象,不会空对象，用new关键字调用是当做构造函数调用,就会创建该构造函数的实例，实例继承构造函数的所有属性和方法。实例通过设置自己的__proto__指向承构造函数的prototype来实现这种继承。
  - 对象__proto__属性的值就是它所对应的原型对象
  - 构造函数，通过protytype来存储要共享的属性和方法,也可以设置prototype指向现存的对象来继承该对象。
  - 对象的__proto__指向自己的构造函数的prototype.  obj.__proto__.__proto__的原型链。
  - instanceof通过探测 obj.__proto__.__proto__... === Constructor.prototype来验证obj是否是Constructor的实例
  - two = new Object() 中 Object是构造函数, 所以 two.__proto__ === Object.prototype.
  - one.对象字面量的原型就是Object.prototype. one.__proto__ ===  Object.prototype
  - Object本身是构造函数,继承了Function.prototype.
  - Function也是对象,继承了Object.prototype
  - Function.__proto__是标准的内置对象 Function.prototype
  - Function.prototype.__proto__是标准的内置对象 Object.prototype

  ```
    例如：
    var one = { x : 1};
    var two = new Object();
    one.__proto__ === Object.prototype 
    two.__proto__ === Object.prototype
    one.toString === one.__proto__.toString
  ```
  - 
    <img src="images/interview/jsobj.jpg"> 

##### https的理解 

  - Https 就是 Hypertext Transfer Protocol over Secure Socket Layer 
  - HTTP是应用层，下面加了一层SSL层。
  - http的端口是80，https的端口是443
  <img src="images/interview/https.png"> 
  - 对称加密： 加密和解密使用相同的密钥
  - 非对称加密： 有公钥和私钥

##### web安全了解，描述xss攻击原理 

  - 跨站攻击
  - Xss指恶意攻击者往Web页面里插入恶意html代码,当用户浏览器该页之时,嵌入其中Web里面的html代码会被执行,从而达到恶意攻击用户的特殊目的。
  - XSS的攻击三种攻击类型：
  - `反射型XSS`: 跨站代码一般存在于某个链接中,当被攻击者访问这个链接时,跨站代码就被执行，这类跨站代码一般不会存储在服务器上面
    - 攻击方式: 给别人发送带有恶意脚本代码参数的URL,当URL地址被打开时，特有的恶意代码参数被HTML解析、执行。它的特点是非持久化，必须用户点击带有特定参数的链接才能引起。
  - `存储型XSS`: 这种xss用起来比较方便,跨站代码会存储在服务器上面数据库中，换句话就是可以持久的进行攻击，亦称持久型XSS
    - 攻击方式: 攻击脚本被存储到了数据库或者文件中,服务器端（可能是别的应用或者别的页面）在读取了存储的内容后回显了，就是存储型
    - XSS代码被提交给网站-->网站把XSS代码存储进数据库—>当该页面再次被请求时，服务器发送已经被植入XSS代码的数据给客户端—>客户端执行XSS代码
  - `基于DOM的XSS`: 由于客户端脚本自身的解析不正确导致的安全问题
    - 攻击方式：基于文档对象模型Document Objeet Model，DOM)的一种漏洞。
    - 程序或脚本动态地访问和更新文档内容、结构和样式，处理后的结果能够成为显示页面的一部分。DOM中有很多对象，其中一些是用户可以操纵的，如uRI ，location，refelTer等。客户端的脚本程序可以通过DOM动态地检查和修改页面内容，它不依赖于提交数据到服务器端，而从客户端获得DOM中的数据在本地执行，如果DOM中的数据没有经过严格确认，就会产生DOM—based XSS漏洞。


##### XSS的防范方法
  
  - 不信任任何用户的输入,对每个用户的输入都做严格检查、过滤，在输出的时候,对某些特殊字符进行转义，替换等。

##### CSRF攻击

  - 伪造客户端请求
  - Cross Site Request Forgery： 跨站点伪造请求
  - 强迫受害者的浏览器向一个易受攻击的Web应用程序发送请求,最后达到攻击者所需要的操作行为。
  - CSRF站内类型的漏洞在一定程度上是由于程序员滥用$_REQUEST类变量造成的
  - CSRF站外类型的漏洞其实就是传统意义上的外部提交数据问题

##### js如何操作cookie 

  - document.cookie 拿到cookie
  - cookie大小不能超过4kb
  - cookie 格式 <cookie名>=<值>
  - cookie 有效期： 当浏览器关闭时结束。逆反这种行为，可以设置有效期和失效期
  - 清除cookie的方法
    - 通过浏览器工具清除 cookie
    - 设置cookie有效期清除cookie: 　　`document.cookie = "name=value;expires=date" var _date = new Date(); _date = setDate(_date.getDate()+30) _date.toGMTString()`
    - 删除cookie
  - 创建cookie

  ```
    function setCookie(c_name, value, expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
    }
    使用方法：setCookie('username','Darren',30)  
    exdate.setHours(exdate.getHours() + expiredays);
  ```
  - jquery 获取cookie的方法： $.cookie("name"); 
  - jquery 删除cookie的方法： $.cookie("name",null);

##### ajax的实现机制

  - 核心是：XMLHttpRequest 对象
  - 一个完整的ajax请求包含以下步骤
    - 实例化XMLHttpRequest对象
    - 连接服务器
    - 发送请求
    - 接收响应数据
  - `readyState属性`
    - 0: uninitialized, 未初始化。已经创建了XMLHttpRequest对象但是未初始化。
    - 1: loading, send for request but not called .已经开始准备好要发送了。
    - 2: loaded,send called,headers and status are available。已经发送，但是还没有收到响应
    - 3: interactive, downloading response,but responseText only partial set.正在接受响应，但是还不完整。
    - 4: completed,finish downloading.接受响应完毕。
  - `responseText` 服务器返回的响应文本
  - `responseXML` 响应信息是xml，可以解析为Dom对象。
  - `status` 服务器的Http状态码，若是200，则表示OK，404，表示为未找到。
  - `statusText` 服务器http状态码的文本

  ```
1 //把传进来的json格式转换url
 2 function json2Url(json){
 3     var arr = [];
 4     json.t = Math.random();//添加随机时间，兼容ie
 5     for(var name in json ){
 6         arr.push(encodeURIComponent(name)+'='+encodeURIComponent(json[name]));
 7     }
 8     return arr.join('&');//转成url格式
 9 };
10 //创建ajax函数
11 function ajax(json){
12     var timer = null;//定时器
13     //判断是否有url
14     if (!json.url) {
15         alert('没有url');
16         return;
17     }
18     // 创建ajax对象
19     if (window.XMLHttpRequest) {
20         var oAjax = new XMLHttpRequest();
21     }else{
22         var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
23     }
24 
25     //数据赋值以及默认值
26     json.data = json.data || {}; //url ->?后面wd=a&json=1这个格式
27     json.time = json.time || 5000; //5秒后超时
28     json.asyn = json.asyn || true; //默认异步
29     json.type = json.type || 'GET';//默认GTE
30 
31     //提交方式判断
32     switch(json.type.toUpperCase()){
33         case 'GET':
34         oAjax.open('GET',json.url+'?'+json2Url(json.data),json.asyn);
35         oAjax.send(null);
36         break;
37 
38         case 'POST':
39         oAjax.open('POST',json.url,json.asyn);
40         oAjax.setRequestHeader('Content-type','application/x-www/form-urlencoded');
41         oAjax.send(json2Url(json.data));
42         break;
43     }
44 
45     //判断ajax是否已经完成响应
46     oAjax.onreadystatechange = function(){
47         if (oAjax.readyState == 4) {//ajax的状态是否已经完成响应
48             if (oAjax.status == 200 ) { //成功状态码
49                 json.success && json.success(oAjax.responseText);
50                 clearInterval(timer);
51             }else{
52                 json.error && json.error(oAjax.status);
53                 clearInterval(timer);
54             }
55         }
56     };
57     //设置超时
58     timer = setTimeout(function(){
59         alert('请求网络超时');
60         json.complete && json.complete();
61         oAjax.readystatechange = null;
62     },json.time);
63 }

  ```
  - 主要就是先创建XMLHttpRequest 对象。然后根据传进来的数组进行赋值和默认值,判断提交方式是get还是post,然后通过onreadystatechange事件,进行监听，当readyState发生变化就触发这件事。最后进行超时处理。

##### get和post的区别

  - GET表示用于信息的获取,而且应该是安全的和幂等的
  - POST表示可能修改服务器上的资源的请求
  - 表达形式上的不同：
    - GET请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，参数之间以&相连，如：login.action?name=hyddd&password=idontknow&verify=%E4%BD%A0%E5%A5%BD。如果数据是英文字母/数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密，得出如：%E4%BD%A0%E5%A5%BD，其中％XX中的XX为该符号以16进制表示的ASCII。
    - POST把提交的数据则放置在是HTTP包的包体中。
  - GET提交的数据在不同浏览器下有长度的限制，post则没有长度的限制
  - post请求的安全性比get的安全性要高。

##### 同步和异步的区别

   - 同步是指：发送方发出数据后，等接收方发回响应以后才发下一个数据包的通讯方式。  
   - 异步是指：发送方发出数据后，不等接收方发回响应，接着发送下个数据包的通讯方式。  

##### cdn缓存的实现机制

   - CDN：Content Delivery Network,内容分发网络。


##### 双向绑定的原理

##### 理解Vue中的Virtual Dom

  - Virtual Dom 就是js中模拟DOM对象树中来优化DOM操作的一种技术和思路
  - VNode可以理解为Vue框架的虚拟dom的基类，通过new实例化的VNode大致分为以下基类：
    - EmptyVNode: 没有内容的注释节点
    - TextVNode: 文本节点
    - ElementVNode: 普通元素节点
    - ComponentVNode: 组件节点
    - CloneVNode: 克隆节点，可以是以上任意类型的节点，唯一的区别在于isCloned属性为true

  如下图所示

   <img src="images/interview/VNode.png"> 
##### vue.js和angularjs的区别

##### 浏览器兼容的处理 

##### 节流和防抖动的区别

 - 防抖动，是限制下次函数调用之前必须等待的时间间隔。正确实现 debouncing 的方法是将若干个函数调用合成 一次，并在给定时间过去之后仅被调用一次。

  ```
  function debouce(func,delay,immediate){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(timer) clearTimeout(time);
        if(immediate){
            //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
            var doNow = !timer;
            //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
            timer = setTimeout(function(){
                timer = null;
            },delay);
            //立即执行
            if(doNow){
                func.apply(context,args);
            }
        }else{
            timer = setTimeout(function(){
                func.apply(context,args);
            },delay);
        }
    }
  }
  ```

  - 节流，允许一个函数在规定的时间内只执行一次。
  - 它和防抖动最大的区别就是，节流函数不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。
  - 用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据

  ```
  时间戳实现：
  var throttle = function(func,delay){
    var prev = Date.now();
    return function(){
        var context = this;
        var args = arguments;
        var now = Date.now();
        if(now-prev>=delay){
            func.apply(context,args);
            prev = Date.now();
        }
    }
  }
  定时器实现：
  var throttle = fucntion(func,delay){
    var timer = null;

    return funtion(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                func.apply(context,args);
                timer = null;
            },delay);
        }
    }
  }

  时间戳+定时器一起实现：
  var throttle = function(func,delay){
    var timer = null;
    var startTime = Date.now();

    return function(){
        var curTime = Date.now();
        var remaining = delay-(curTime-startTime);
        var context = this;
        var args = arguments;

        clearTimeout(timer);
        if(remaining<=0){
            func.apply(context,args);
            startTime = Date.now();
        }else{
            timer = setTimeout(func,remaining);
        }
    }
  }
  ```
  - 防抖动： 将几次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
  - 节流： 使得一定时间内只触发一次函数。 它和防抖动最大的区别就是，节流函数不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而防抖动只是在最后一次事件后才触发一次函数。 原理是通过判断是否到达一定时间来触发函数，若没到规定时间则使用计时器延后，而下一次事件则会重新设定计时器。


