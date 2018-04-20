#### 这些主要是在使用过程中，css灵活使用，可以减少代码量

* 去掉图片的白色背景
    `mix-blend-mode: darken`
* 文字特效: 渐变填充
    >   
        .editor-element-text { 
            background-clip: text; 
        }
        .background-image: 
            linear-gradient (146.976deg, rgba(107, 25, 207) 0%),
            rgba(242, 255, 0) 21.1765%,
            rgba(31, 222, 216) 35,8824&,
            rgba(255, 0, 153) 71.4706%,
            rgba(0, 0, 0) 100%);

* 使用animation-timing-function: steps, 可以做一整张动画。 
  animation-timing-function 参数的运用参考[链接](https://idiotwu.me/understanding-css3-timing-function-steps/)
  在项目中的应用场景主要在页面中,原理就是一帧一帧地替换。然后用一张长图,去做成一个动画。
  项目线程例子参考： [狼人杀引导页面](http://git.yypm.com/lrs/guide-201704-feat-mob/blob/master/src/css/module/guide/_guide.scss)
  在线查看例子：[狼人杀动画](http://langrensha.yy.com/a/guide/index.html)

  ```
    .voice{
        width: 620px;
        height: 200px;
        margin: 95px auto;
        overflow: hidden;
    }
    .volice__inner{ 
        width: 620px;
        height: 19200px;
        background-image: url('../img/bing-4.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        animation: step 4s steps(96) both infinite;
    }
    @keyframes step {
        100% {
            background-position: 0 -19200px;
        }
    }
  ```
  用steps属性,去移动图片,使其不断地替换一小部分图片,外面的容器用固定宽高替代,从而达到帧动画的效果。

* 可以用background属性模拟做弹幕的效果

  在项目开发过程中,经常会用到弹幕,然而弹幕开发量比较大,如果是固定展示几条固定内容的弹幕,其实可以直接用background属性去展示,比如
    > 
        .app-danmu {
            display: none;
            width: 1217px * 4;
            height: 503px;
            position: absolute;
            left: 100%;
            top: 340px;
            background-repeat: repeat;
            background-size: 1217px 503px;
            background-image: url(~img/index/danmu.png);
            animation: danmu 20s linear infinite;
            z-index: 200;
        }
    设置背景图片的大小为当前图片的大小。然后,把整个宽度设置为当前图片宽度的4倍,然后进行
* 进行水平垂直居中的一些方法

  - 方案1：
  ```
    使用display:box进行水平垂直居中
    .wrapper {
        position: relative;
        width: 100%;
        height:100%;
        display:-webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;    // 水平居中
        -webkit-box-align:center;    // 垂直居中
    }
  ```

   - 方案2：
    ``` 
    .wrapper {
        display:flex;
        margin: auto;
    }
    ```

  - 方案3：
    ``` 
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ```