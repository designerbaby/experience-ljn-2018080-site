###### http详解

###### 一、http缓存和请求

 1次完整的http请求消息包括：一个请求行、若干消息头以及实体内容，而消息头和实体内容可以没有，消息头和实体内容间有一个空行。
 我们来看一个例子：
 ```
   1 Get /mattmarg/ HTTP/1.0
   2 User-Agent: Mozilla/2.0 (Macintosh; I; PPC)
   3 Accept: text/html; */*
   4 Cookie: name = value
   5 Referer: http://www.XXX.com/a.html
```
  - 其中，第1行就是请求行：请求方式为Get（除了Get之外，还有Post、Put、Delete方式），请求的文件位于"根目录/mattmarg/"下，当然也可以直接给出需要的页面（如：/mattmarg/index.asp，也可以加上一些其它字段 如：/mattmarg/index.asp？id=1&uid=xxx。当我们通过Get请求时，提交给服务器的请求行长度不能超过1K,而如果利用Post方式，则是把所提交的信息以实体内容形式发送给服务器，所以如果服务器没有限制的话，原则上讲可以传输无限大的内容）
  - HTTP/1.0 表示了http的版本为1.0。其余几行就是消息头了，消息头主要是用来向服务器传达某种信息或指示。如告诉服务器自己的终端（User-Agent）是什么(如果是浏览器则返回相应的浏览器型号),终端所可以解释的类型（Accept）是什么，是从哪个页面提交的请求（Referer），以及浏览器所能解释的语言（Accept-Language）等等。
  - 我们这里拿Accept-Language来举个例子，大家都知道google在中国大陆显示的是简体中文，而在其它的国家则显示对应的语言，这个是怎么做到的呢？其实就是浏览器向服务器递交的请求信息中包含了Accept-Language,而我们的浏览器默认是zh-cn,然后服务器在接受到该信息时返回对应的页面。

###### 二、HTTP响应消息

  Http响应消息的格式为：一个状态行、若干消息头和实体内容，其中消息头和实体内容可以没有，消息头和实体内容间有一个空行。
  我们依旧先来看一个例子：
  ```
    HTTP/1.1 200 OK
    Server: Microsoft-IIS/5.1
    X-Powered-By: ASP.NET
    Date: Sun, 06 Jul 2008 11:01:21 GMT
    Content-Type: text/html
    Accept-Ranges: bytes
    Last-Modified: Wed, 02 Jul 2008 01:01:26 GMT
    ETag: "0f71527dfdbc81:ade"
    Content-Length: 46
    <html><head></head><body>adfasfa</body></html>
  ```
  
  其中，01行是状态行，用于显示服务器响应的状态，HTTP/1.1显示了对应的http协议版本，200为状态数字，OK为状态信息用于解释状态数字（这里OK对应200，表示请求正常）；02~09是消息头部分，10为空行，11为实体内容（也就是服务器返回的网页内容）。

 - 好了，相信大家应该已经对这个http请求的流程有了一个大概的了解了吧，那么我们反过来回答下最初留下的问题:当我们在浏览器的地址栏中输入 " http://www.baidu.com/ " ，然后按"回车"，这之后发生了什么事？。

   首先，浏览器找到该网址所指向的IP，然后与其建立TCP连接，接着向百度服务器提出Get请求，当服务器接收到我们的请求后，向我们传送应答信息--百度的页面,然后断开连接。
