##### Emmet语法

子代：>

如：`div>ul>li`
```
<div>

　　<ul>

　　　　<li>

　　　　</li>

　　</ul>

</div>
```
兄弟：+

如：`div+p+bq`

```
<div></div>
<b></b>
<blockquote></blockquote>
```

父代：^   `div+div>p>span+em^bq`
```
<div></div>
<div>
<p>
<span><em></em></span>
<blockquote></blockquote>
</p>
</div>
```
重复：*  `ul>li*5`
```
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
```
成组：（）  `（div>dl>(dt+dd)*3）+foooter>p`
```
<div>
<dl>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
<dt></dt>
<dd></dd>
</dl>
</div>
<footer>
<p></p>
</footer>
```
ID:#、Class:.  `div#header+div.page+div#footer.class1.class2.class3`
```
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```
属性：[]  `td[title="title" colspan="3"]`
```
<td title colspan="3"></td>
```