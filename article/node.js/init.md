##### 初学node

###### 1、REPL（Read Eval Print Loop: 交互式解释器)
   
   - REPL 表示一个电脑的环境。类似系统终端或者Unix/Linux shell

###### 2、回调函数。

   - 非阻塞运用。一般是要用异步和非阻塞的。
   - 同步,只能做一件事
   - 异步,做这一件事的时候可以做其他的事
   - 阻塞，只能做一件事，不能做下一件事，阻塞了
   - 非阻塞,做这一件事情的时候，可以同时做另一件事情，就是非阻塞。

###### 3、事件循环

   - node.js是单进程单线程,可以通过事件和回调支持并发。
   - 每个Api是异步的,并作为一个独立线程运行，使用异步函数调用，并处理并发。
   - 基本上所有的事件机制是用设计模式中观察者模式实现。
   - Node.js 使用事件驱动模型，当web server 接收到请求,就把它关闭然后进行处理，然后去服务下一个web请求。
   - 当这个请求完成,它被放回处理队列,当到达队列开头,这个结果被放回给用户。
   - 这个模型非常高效可拓展性非常强，因为webserver一直接受请求而你等待任何读写操作。
   - 事件循环模型如下：

    <img src="images/node/1.jpg"> 

###### 4、EventEmitter

   - 所有的异步I/O操作在完成时都会发送一个事件到事件队列。
   - 大多数不会直接使用EventEmitter,而是在对象中继承它。包括fs、net、http在内的,只要是支持事件响应的核心模块都是EventEmitter的子类。
       - 具有某个实体功能的对象实现事件符合语义,事件的监听和发生应该是一个对象的方法。
       - javascirpt的对象机制是基于原型的,支持部分多重继承,继承EventEmitter不会打乱对象原有的继承关系。
   - eventEmitter.on与eventEmitter.addListener()没有区别,且一个事件可以绑定多个回调函数。
   - 若事件队列中出现一个未绑定事件则触发error事件，若未绑定 error事件则程序抛出异常结束执行

###### 5、buffer

   - Buffer.from() 接口去创建Buffer对象。  const buf1 = Buffer.from();
   - 写入缓冲区: buf.write(string[, offset[, length]][, encoding])
   - 从缓冲区读取数据： buf.toString([encoding[, start[, end]]])
   - 将Buffer转换成JSON对象： buf.toJSON()
   - 缓冲区合并 Buffer.concat(list[, totoalLength])
   - 缓冲区比较 buf.compare(otherBuffer);
   - 拷贝缓冲区 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]])
   - 缓冲区裁剪 buf.slice([start[, end]])
   - 缓冲区长度 buf.length

###### 6、Stream

   - 从流中读取数据： var fs = require('fs');  fs.createReadStream('input.txt');
   - 写入流： var fs = require('fs'); fs.createWriteStream('output.txt');
   - 管道流： readerStream.pipe(writerStream);
   - 链式流： var fs = require('fs'); fs.createReadStream('input.txt').pioe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt'))

###### 7、模块系统

   - 创建模块是为了文件之间可以互相调用。模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
   - 服务器中读取模块的顺序

     <img src="images/node/nodejs-require.jpg"> 
  
   - require 接口以下几种参数的传递：

     - http、fs、path等,原生模块
     - ./mod或../mod,相对路径的文件模块
     - /pathtomodule/mod, 绝对路径的文件模块
     - mod,非原生模块的文件模块

###### 8、函数

   - http中传递的一般就是匿名函数
   - 匿名函数如下：

   ```
    
        var http = require('http');

        http.createServer(function(request, response) {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Hello World');
            response.end();
        }).listen(8888);

   ```
    
   - 非匿名函数如下：

   ```
        var http = require('http');

        function onRequest(request, response) {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Hello World');
            response.end();
        }

   ```

###### 9、路由

   - 需要的所有数据都会包含在request对象中,该对象作为onRequest()回调函数的第一个参数传递
   - 需要url和queryString模块进行解析

###### 10、全局对象

   - __filename 表示正在执行脚本的文件名
   - __dirname 表示当前执行脚本所在的目录
   - setTimeout(cd, ms) 代表定制器的句柄值
   - clearTimeout(t) 全局函数用于停止一个之前通过setTimeout()创建的定时器
   - setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)
   - console 用于控制台标准输出。
   - process 全局变量,global对象的属性。用于描述node.js进程状态的对象,提供了一个与操作系统的简单接口

###### 11、node.js 常用工具 —— util

   - util.inherits(constructor, superConstructor) 实现对象间原型继承的函数
   - util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。
   - util.isArray(object) 判断是否为一个数组
   - util.isRegExp(object) 判断是否为正则表达式
   - util.isDate(object) 判断是否为一个日期
   - util.isError(object) 判断是否为一个错误对象

###### 12、文件系统

   - Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
   - 异步模式下打开文件： fs.open(path, flags[, mode], callback)
   - 获取文件信息： fs.stat(path, callback)
   - 写入文件： fs.writeFile(file, data[, options], callback)
   - 读取文件： fs.read(fd, buffer, offset, length, position, callback)
   - 关闭文件： fs.close(fd, callback)
   - 截取文件： fs.ftruncate(fd, len, callback)
   - 删除文件:  fs.unlink(path, callback)
   - 创建目录:  fs.mkdir(path[, mode], callback)
   - 读取目录:  fs.readdir(path, callback)
   - 删除目录:  fs.rmdir(path, callback)

###### 13、Node.js GET/POST请求

   - 获取get请求内容
   - 获取URL的参数： 使用 url.parse 方法来解析 URL 中的参数
   - 获取post请求内容
   - http.ServerRequest 并没有一个属性内容为请求体

###### 14、工具模块

   - OS模块
   - Path 模块
   - Net 模块
   - DNS 模块
   - Domain 模块

###### 15、使用Node创建Web服务器

   - http模块主要用于搭建HTTP服务器和客户端，使用HTTP服务或客户端功能必须调用http模块。

###### 16、Express框架

   - 简洁而灵活的node.js Web应用框架,提供了一系列强大特性帮助你创建各种Web应用。使用 Express 可以快速地搭建一个完整功能的网站。
   - Express 框架核心特性：
      - 设置中间件来响应HTTP请求
      - 定义了路由表来执行不同的HTTP请求动作
      - 通过向模板传递参数来动态渲染HTML页面  
   - express请求的方法 require('express'); 令app = express();
   - 用app.get方法,然后一般使用方法如下所示：
   
```
  app.get('/', function(req, res) {
      
  })
```
   - express使用request和response对象处理请求和响应的数据
   - request和response对象的具体介绍：

```
  Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

    req.app：当callback为外部文件时，用req.app访问express的实例
    req.baseUrl：获取路由当前安装的URL路径
    req.body / req.cookies：获得「请求主体」/ Cookies
    req.fresh / req.stale：判断请求是否还「新鲜」
    req.hostname / req.ip：获取主机名和IP地址
    req.originalUrl：获取原始请求URL
    req.params：获取路由的parameters
    req.path：获取请求路径
    req.protocol：获取协议类型
    req.query：获取URL的查询参数串
    req.route：获取当前匹配的路由
    req.subdomains：获取子域名
    req.accepts()：检查可接受的请求的文档类型
    req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
    req.get()：获取指定的HTTP请求头
    req.is()：判断请求头Content-Type的MIME类型
    Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

    res.app：同req.app一样
    res.append()：追加指定HTTP头
    res.set()在res.append()后将重置之前设置的头
    res.cookie(name，value [，option])：设置Cookie
    opition: domain / expires / httpOnly / maxAge / path / secure / signed
    res.clearCookie()：清除Cookie
    res.download()：传送指定路径的文件
    res.get()：返回指定的HTTP头
    res.json()：传送JSON响应
    res.jsonp()：传送JSONP响应
    res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
    res.redirect()：设置响应的Location HTTP头，并且设置状态码302
    res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
    res.send()：传送HTTP响应
    res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
    res.set()：设置HTTP头，传入object可以一次设置多个头
    res.status()：设置HTTP状态码
    res.type()：设置Content-Type的MIME类型  
```

   - 通过路由去访问不同页面
   - 加载静态文件：例如图片、css、javascript文件放在public目录下,则可以这样写 `app.use(express.static('public'))`;
   - 经常使用body-parser实现解析 `app.use(bodyParser.json());`  `app.use(bodyParser.urlencoded({ extended: false }));`
   - 创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data。
   - 可以使用中间件cookie-parser向 Node.js 服务器发送 cookie 信息

###### 17、node.js restful API

   - REST即表述性状态传递(Representational State Transfer，简称REST)
   - 表述性状态转移是一组架构约束条件和原则。REST是设计风格而不是标准。
   - REST基于使用TTP、URL和XML以及HTML。
   - 使用JSON数据格式
   - 基本架构的四个方法
       - GET 获取数据
       - PUT 更新或添加数据
       - DELETE 删除数据
       - POST 添加数据
   - RESTful Web Services 平台独立、低耦合、自包含、基于可编辑的Web的应用程序，可使用开放的XML标准来描述、发布、发现、协调和配置这些应用程序。
   - 获取用户列表： RESTful API listUsers。用于读取用户的信息列表
   - 添加用户： RESTful API addUser。用于添加新的用户数据
   - 显示用户详情：  RESTful API :id（用户id）。 用于读取指定用户的详细信息
   - 删除用户: RESTful API deleteUser。  用于删除指定用户的详细信息

 