### 一、js面向对象的根基：无类继承 ———— 周爱民

   github源代码[https://github.com/aimingoo/metameta](https://github.com/aimingoo/metameta)

   ppt[https://feday.fequan.com/2018/classless_inheritance_in_javascript.pdf](https://feday.fequan.com/2018/classless_inheritance_in_javascript.pdf)

##### 1、之前类的定义
  ```
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
  ```
  <img src="images/feday/prototype.jpg"> 
  可以看到，有个对象，它本身就包含了一些办法。比如toString()等等。同时MyObject的构造器的 `_proto_` 属性也指向了Object的原型。所以运算出可以得到就是obj.x= 100;
  obj.xxx = 100
  - 有几个方法可以帮助我们检测他们的一些属性
    - Object.hasOwnProperty(obj, ...) 指示对象自身属性中是否具有指定的属性
    - Object.defineProperty(obj, ...) 直接在一个对象上定义一个新的属性,或者修改一个对象的现有属性。
    - Object.freeze() // 冻结一个对象
    - Object.XXXX()
    - obj = Object.create(X, { ... })
    - Object.serPrototypeOf(obj, X)
    - X.isPrototypeOf(obj) vs obj instanceof Object // 前者用于测试一个对象是否存在于另一个对象的原型链上，后来则用于检测constructor.prototype是否存在于参数Object的原型链上
  - 对象就是属性包
    - 原型继承就是属性包的链式访问
    - 所有实例对象共享同一个prototype对象
    - 所以可以没有类继承（例如构造器和new）

    
##### 2、 Atom
 - atom： 原子
  - 定义： The atom is smallest unit of pure object in javascript.it's object but not inherited from Object(). An atom is a object.
  - 原生的、基于ECMAScript 的元类继承模型

 - meta: 元: 能产生原子的一个过程
    - Meta - 能产生meta的一个过程，称为元类型
    - MetaClass - 如果所产生的Meta是一个类,则这个Meta称为元类类型
 - 判断是不是原子对象的一个方法
    ```
        function isAtom(obj) {
            let types = {object: true, function: true},
            if (type[typeof obj]) {
                return !(obj instanceof Object)
            }
            return false;
        }
    ``` 
 
  <img src="images/feday/atom.jpg"> 

 - atom object: 四个原子对象：
    - null
    - Object.prototype
    - arguments
    - namespace

 - `Objext = Meta.from(Object)`

 <img src="images/feday/objext.jpg"> 
 
 - 应用？ 也没说
  
### 二、kepler.gl在海量地理定位数据可视化的应用 ———— 何珊

 - 和公司分享的差不多，就不细讲

### 三、复杂业务前端团队的进化之路 ———— 谢晓立
ppt[https://feday.fequan.com/2018/%E5%A4%8D%E6%9D%82%E4%B8%9A%E5%8A%A1%E5%89%8D%E7%AB%AF%E5%9B%A2%E9%98%9F%E7%9A%84%E8%BF%9B%E5%8C%96%E4%B9%8B%E8%B7%AF.pdf](https://feday.fequan.com/2018/%E5%A4%8D%E6%9D%82%E4%B8%9A%E5%8A%A1%E5%89%8D%E7%AB%AF%E5%9B%A2%E9%98%9F%E7%9A%84%E8%BF%9B%E5%8C%96%E4%B9%8B%E8%B7%AF.pdf) ———— 京东 - 商城用户体验设计部 - 多终端研发部  凹凸实验室 业务有 pc、微信手Q、营销H5、小程序
##### 1、Athena 雅典娜 —— 统一前端工程化解决方案
   - 自动化工具
    - less/scss编译、资源压缩、项目结构生成、资源合并、直出处理、热更新浏览、页面片生成、文件md5戳、路径替换、一键部署
   - 轻量组件化功能
  
    ```
        <%= widget.load('widget', {
            content: '楼层内容'
        }) %>
    ```

   - 首屏html代码直出
       <img src="images/feday/html.jpg"> 
   - 基于楼层的懒加载
    - [www.jd.com](https://www.jd.com/)
    - 页面 = 楼层 x N ?  => 页面 = 组件 x N！
  
##### 2、 Nerv
  - 为了更完善的组件化，更通用的优化方案 -> 对比了Vue,angular,react!! -> 发现不能兼容IE8,引出了`Nerv`，与react相同的语法，还能兼容IE8,但是只采用了虚拟dom和数据绑定。
  - 声称完成diff算法优化和同步了diff & patch, 只有 `9kb` gizpped, 地址： [https://nerv.aotu.io/](https://nerv.aotu.io/)
    - 如何提高性能
        - 懒加载: `npm i react-lazyload`
        - 延迟加载： `npm i react-loadable`
        - 状态管理： `npm i redux nerv-redux redux-thunk`   
  -  所以他们所使用的架构就是这样：
  <img src="images/feday/jiagou.jpg"> 

##### 3、Taro ---- 多端统一框架

  - 要兼容小程序，发现原来这套存在很多问题（比如规范不统一、落后的开发模式等等），推出了`Taro`
      - 原始流程是: 初始化项目(项目重名) -> 本地开发、预览(前后端分离，联调障碍) -> 本地编译(编译结果差异) -> scp预发环境 -> 测试 -> scp正式环境(文件覆盖) -> 同步IDC(深夜出现Bug,正式环境素材过大,生效时间不可控)
        - 开发工具版本不统一？ -> 使用服务器编译
        - 前后端进度耦合,沟通中存在分歧? -> 使用了接口文档&Mock平台
        - 深夜Bug? -> 启动了数据监控系统、检测模块可用性、保证页面安全、监控素材尺寸与体积、确保页面性能、增加24h监控告警服务
  <img src="images/feday/bug.jpg"> 
  - 增加自动化测试，监控页面DOM结构,确保页面完整;自动UI测试,用户视觉的UI监控，保障页面100%可用。
  - 低效 浪费？(总计30+系统、闲置系统40%、55%项目不全) -> 整合,实现工具间的高效衔接，实现系统化和自动化
   <img src="images/feday/auto.jpg"> 

  - 再加上基于tapable的插件化功能
  - 最终形成了
    <img src="images/feday/xitong.jpg"> 

    [https://aotu.io/](https://aotu.io/)
### 四、webpack 主题相关 ———— Sean Thomas Larkin

 github[https://github.com/webpack/webpack](https://github.com/webpack/webpack)

 - 介绍plugin + a example
 - 介绍compile + a example 
 - 介绍parser + a example

<img src="images/feday/webpack-1.jpg"> 
<img src="images/feday/webpack-2.jpg"> 
<img src="images/feday/webpack-3.jpg"> 

### 五、Front-End career growth ———— 陈广琛（Cat Chen）

  ppt[https://feday.fequan.com/2018/Front-End%20Career%20Growth.pdf](https://feday.fequan.com/2018/Front-End%20Career%20Growth.pdf)
##### 1、Is front-end the right choice? 
   - what kind of customer do you want to serve? 
    - product: serving external users.
        - There is an `user problem` you want to solve. 
        - Many opportunities are open to companies at different scales, from start-ups to industry leaders.
    - Infrastructure: serving engineers in internal teams
        - There is an engineering problem you want to solve by providing `a scalable service`. 
        - Your customers are engineers in the company: 
            - It might be easier for you to `have empathy for customers` because you are an engineer;
            - It’s easier to `talk to customers` because they are in the same company. 
        - Only companies at certain scale or above can afford an infrastructure team.
    - Product infrastructure: serving internal and external engineers.
        - There is an engineering problem you want to solve with `a reusable framework`. 
        - Your `core customers` are internal engineers. 
        - External customers matter `only if`
            -  It improves the company’s reputation in the industry;
            -  It helps attract candidates and convince them to join. 
        - Company scale required to sustain a product infrastructure team is smaller
    - There are no clear lines between these options.
   - Do you care about user problems or engineering problems (engineer as user)? 
    - ▸ User problems => `Product`
    - ▸ Engineering problems => 
        - ▸ Do you want to build scalable service or reusable framework? 
            - Scalable service =>  `Infrastructure`
            - Reusable framework => `Product Infrastructure`

##### 2、Front-end, backend or full stack?
   - A better question: which one can make you work harder?
    - This choice only matters a lot in the first few years of your career. 
    - Everything converges in later stages of your career. 
    - Pick the one that can get you through the first few years faster.

##### 3、A typical career path forward.
   - 先举了个例子，介绍从新手到老司机的过程 
    - Student Driver-> new Driver -> Experienced Driver -> Courier(导游) -> Trip organizer -> Expedition(探险家)
   -  how does thst translate back to programming?
    - Stage 0 - Student Driver
        - Figure out whether you enjoy programming.   
        - Have fun writing a lot of code. 
        - Have noticeable amount of bugs in code. 
    - Stage 1 - New Driver
        - Enjoy programming most of the time. 
        - Have some bugs or bad designs from time to time. 
        - Receive advices from more experienced programmers.
    - Stage 2 - Experienced Driver
        - Have a track record of committing high quality codes: 
            - Bug free; 
            - Easy to understand and maintain. 
        - Can follow project plan to deliver projects that takes a month or so. 
        - May be irritated by new programmer’s code.
    - Stage 3 - Courier
        - Move business from point A to point B reliably and speedy. 
        - Point B can be a few months away from point A.
        - Figure out how to divide the work into multiple projects.
        - Have backup plans if the original plan doesn’t work out.
    - Stage 4 - Trip Organizer
        - Rally a group of people at point A and get them excited about point B.
        - Get everybody working together to reach point B by whatever means.
        - Assemble an expedition force and find it
    - Stage 5 - Expedition
        - There might be a really amazing point B
        - It’s hidden in a place beyond the reach of existing business. 
        - Assemble an expedition force and find it
  
##### 4、skills to pick up along the path
   - Goals in Stage 0 (Student Driver)
    - Write a lot of code as a practice. 
    - Have a low friction setup to reduce non-coding distraction
   - Skills in Stage 0(Student Driver)
    - Gain effciency in one programming language
    - Learn basic front-end stuff: HTML/CSS/JS
    - Get familiar with development environment
      - IDE(any kinf of IDE)
      - Linux commands
      - Git
   - Goals in Stage 1 (New Driver)
    - Write high quality code. 
    - Learn from others in an efficient way  
   - Skills in Satge 1(New Driver)
    - Apply process and tools to imporve code quality:
        - Coding style guidelines;
        - Testing: unit test, integration test, etc.
    - Ask questions:
        - Get confortable asking questions;
        - Balacnce between researching by yourself and asking others;
        - Ask concise question with enough context;
   - Goals in Stage 2 (Experienced Driver)
    - Design and maintain high quality systems. 
    - Self-sufficiency in programming. 
    - Start mentoring programmers in earlier stages.
   - Skills in Stage2(Experienced Driver)
    - System design:
        - Analysis of trade-offs;
        - Knowledge of wide range of modern technologies
    - Efficient debugging:
        - Get comfortable with large legacy codebase;
        - Bisect problems;
        - Chrome devtools(and counterpart in other browsers);
        - Server side debugger.
    - Mentorship(指导) on programming: 
        - Get comfortable with other people thinkering; 
        - Share your experience and knowledge
   - Goals in Stage 3 (Courier)
    - Understand where point B is for the business. 
    - Have a solid plan to get to point B. 
    - Get to point B by executing the plan: 
        - Measure your progress towards point B; 
        - Manage unexpected events
   - Skills in Stage3(Courier)
    - Understanding of business goals:
        - Verbal and written communication; 
        - Basic knowledge of the business you are in.
    - Roadmap planning: mission, goals, timeline, stakeholders, dependencies, risks.
    - Progress tracking
        - Metric defination and logging
        - Exception management("are we there yet?")
    - Risk management:
        - Identify foreseeable risks and plan for mitigation;
        - Redundancy for unforeseeable risks.冗余的
    - Broaden technical competence beyond front-end: 
        - Networking: HTTP/1.1, HTTP/2, Wireshark debugging; 
        - Scalability: web traffic load balance, POP, CDN; 
        - Security: XSS, CSRF, HTTPS, TLS extensions;
        - Performance: instrumentation, optimization
    - Broaden non-technical role competence: 
        - Design: interface, interaction, experience;
        - Data analysis; 
        - Project management.
   - Goals in Stage 4 (Trip Organizer)
    - Raise enough investment for your trip. 
    - Rally enough people for your trip. 
    - Get to point B: 
        - By using your investment efficiently
        - By getting everybody work together effectively.
   - Skills in Stage 4 (Trip Organizer)
    - Leadership: 
        - Vision: product vision and technology trend; 
        - Understanding people: fact, emotion, belief. 
    - Salesmanship. 
    - Strategic thinking. 
    - Resource allocation and planning
    - Continue broadening technical competence: 
        - Scalability: distributed computational power and storage; 
        - Release: continuous integration and deployment; 
        - Non-web front-end: iOS and Android
    - Continue broadening non-technical role competence: 
        - Recruiting; 
        - Coaching;
        - Managing.
   - Goals in Stage 5 (Expedition)
    - Prove that there's a reasonable return on investment for finding and reaching point B. 
        - Get enough money and people for the expedition. 
        - Reach point B (or die trying).
   - Skills in Stage 5 (Expedition)
    -  Scale out existing skills. 
    - Inter-discipline between multiple roles and skills 
 
##### 5、Who is your customer?
   - To wrap up everything, one last question: `who is your customer?`
    - To put it in another perspective: `whose life would be better in what way if you achieve your goal?`
    - Your answer to this question determines everything else.

### 六、Time in javascript ———— 贺师俊 （Hax）

  [ppt](https://johnhax.net/2018/temporal/slide#0)
 - javascript语言初始化Date的定义，照抄java 1.0中java.util.Date的设计
 - 有几个处理事件的库推荐：
    - `Moment.js` [http://momentjs.com/](http://momentjs.com/)
    - `date-fns` [https://date-fns.org/](https://date-fns.org/)
    - `js-joda` [https://js-joda.github.io/js-joda/](https://js-joda.github.io/js-joda/)
 - 最新的tamporal提案  [https://github.com/tc39/proposal-temporal](https://github.com/tc39/proposal-temporal) 
 - civilTime
 - temporal polyfill [https://www.npmjs.com/package/tc39-proposal-temporal](https://www.npmjs.com/package/tc39-proposal-temporal)

### 七、把握趋势，你不容错过的Serverless

 - 介绍2017年的趋势报告，然后介绍了阿里云的计算市场份额，以后不仅要做前端，也要会后端，往后扩展。
    - 一般前端岗位的能力分布
        - 应用及系统运维
        - 服务端业务逻辑开发
        - 设备端交互逻辑开发