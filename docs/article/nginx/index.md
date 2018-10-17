### 从头开始学nginx配置

#### 一、nginx是什么

 - Nginx 是一个“高性能的HTTP和反向代理服务器”，也是一款“轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器”

#### 二、 nginx的下载与安装

 - windows直接在官网 [nginx](https://nginx.org/en/download.html)
 - mac用户自行选择，最好是搭建brew，然后使用brew进行下载，[下载链接参考](https://www.jianshu.com/p/6c7cb820a020)

#### 三、 nginx的配置介绍

 - 同一个指令放在不同层级的块中,其作用域也不同。
 - 如果某个指令在两个不同的层级块中同时出现，就采用“就近原则”,即以较低层级块中的配置为准。
比如,某指令同时出现在http全局块中和server块中,并且配置不同,则以server块中的配置为准。
 - 在Nginx配置文件中,每一条指令配置都必须以分号结束。
 - user 指令用于指定nginx服务器的用户(组),所有用户都可以使用,可以用`user nobody nobody;`
 - worker_processes 全局块,是实现并发处理服务的关键所在。`worker_processes number | auto;` auto就是自动检测
 - pid 配置nginx进程的pid存放路径 `pid logs/nginx.pid;`
 - error_log 存放错误日志的路径 `error_log file | studerr [debug | info | notice | warn | error | crit | alert | emerg];`
 - include 引入配置文件 `include vhost/page.yy.com.conf;`
 - accept_mutex 设置网络连接的序列化 `accept_mutex on | off;` 开启时，就对多个nginx 进程接收连接进行序列化,防止多个进程对连接的争抢。在`events`块中设置，默认为on
 - multi_accept on | off; 是否允许同时接收多个网络连接 `multi_accept on;` 在`events`块中设置，默认为off
 - use method(select、poll、kqueue、epoll、rtsig、/dev/poll、eventport)。在`events`块中设置
 - worker_connections 配置最大连接数,默认为512, `worker_connection 1024;`
 - default_type 用于配置处理前端请求的MIME类型。 `defauly_type mime-type;`默认为`text/plain`
 - `access_log path[format[buffer=size]]` 对服务日志的格式、大小、输出等进行配置.默認為`access_log logs/access.log combined;`
 - `log_format name string ...;` 用于定义服务日志的格式。 比如`log_format main $remote_addr...;`
 - `sendfile on | off;` 配置允许 sendfile 方式传输文件
 - `sendfile_max_chunk 128k;` 配置传输的文件的最大尺寸
 - `keepalive_timeout timeout[header_timeout]` 配置连接超时时间，比如`keeplive_timeout 120s 100s;`在服务器端与客户端保持连接的时间设置为120s,发给用户端的应答报文头部中Keep-Alive域的超时时间为100s.
 - `keepalive_requests number;` 限制用户通过某一链接向Nginx服务器发送请求的次数。默认100
 - `listen address/port/unix;` 配置监听IP地址,端口,unix服务。
 - `server_name name ...;` 基于名称的虚拟主机配置，。可以通过正则表达式进行匹配。匹配的时候遵循一定的规则
 - `server_name 192.168.1.3;` 配置基于IP的虚拟主机
 - `root path` 配置请求的根目录 
  ```
  location /data/ {
      root /locationtestl;
  }
  ```
 - `alias path` 更改location的URI
  ```
  location /xhapp/ {
      alias F:/data/temp/app_reg/;
  }
  ```
 - `index file ...;` 设置网站的默认首页
  ```
  location ~ ^/data/(.+)/web/ $ {
       index  index.html index.htm;
  }
   ```
 - `error_page code ... [=[response]] uri` 设置网络错误页面比如： `error_page 404 /404.html`
```
location /404.html {
    root /myserver/errorpages/
}
```
- `allow address | CIDR | all;` 允许访问Nginx的客户端IP
- `deny address | CIDR | all;` 禁止访问Nginx的客户端IP
- Nginx配置在解析的过程中,遇到deny指令或者allow指令是按照顺序对当前客户端的连接进行访问
```
location / {
    deny 192.168.1.1;
    allow 192.168.1.0/24;   # 先执行，可以访问
    deny all;               # 不会访问到
}
```
- `auth_basic string | off;` 开启或关闭某认证功能
- `auto_basic_user_file file;` 设置包含用户名和密码信息的文件路径
- `worker_cpu_affnity 0001 0100 1000 0010;` 为每个进程分配CPU的内核，前提条件是 `worker_processes 4;` 设置为4个服务进程数
- `send_timeout;` nginx响应客户端的超时时间，比如 `send_timeout 10s;` 就是服务器响应客户端超时时间为10s,超过10s后就关闭
- `client_header_buffer_size` 设置nginx服务器允许的客户端请求头部的缓冲区大小  `client_header_buffer_size 4k;`
- `worker_rlimit_sigpending 1024;` 设置linux平台的事件信号队列长度上限。
- `kqueue_changes number;` 在kqueue事件的驱动模式下，服务器传递给内核的事件数量
- `kqueue_events number;` 在kqueue事件的驱动模式下，服务器从内核取到的事件数量
- `devpoll_changes number;` 在dev/poll事件的驱动模式下，服务器传递给内核的事件数量
- `devpoll_events number;` 在dev/poll事件的驱动模式下，服务器从内核中取到的事件数量
- `epoll_events number;` 在epoll事件驱动下，nginx与事件之前传递事件的数量。 
- `rtsig_singo singo;` rtsig使用的两个信号的第一天，第二个是在第一个信号的编号上加1
- `rtsig_overflow_* `

#### nginx的功能
- gizp压缩
- rewrite功能
- 代理服务
- 缓存机制
- 邮件服务
- 时间管理
- 内存管理

#### nginx的代理服务
- 代理服务： 也叫正向代理服务
- resolver address：制定dns服务器的ip地址
- resolver_timeout time: 用于解析dns服务器域名解析超时时间
- proxy_pass url： 用于设置代理服务器的协议和地址

#### nginx的源码结构

- src目录下包含core event http mail misc os
- mail 主要是邮件服务相关的
- misc .app文件是测试程序中引用的头文件是否与c++兼容  .c文件是用来支持Google PerfTools文件的使用
- os 目录，存在类unix系统
- core
- event
- http