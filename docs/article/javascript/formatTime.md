* 在平常的工作中,经常有格式化时间的需求,接下来有一些格式化时间的代码

简单格式化时间
```
    formatTime: function (time) {
        time = time * 1000;
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + '-' + month + '-' + day;
    }
```

<img src="images/javascript/formatDate.png"> 

<img src="images/javascript/formatTime.png"> 

<img src="images/javascript/judge.png"> 

<img src="images/javascript/random.png"> 

