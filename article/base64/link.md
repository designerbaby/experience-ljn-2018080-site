#### 带你走进base64的世界

base64对于前端来说并不陌生,在性能优化方面，base64经常被用于小图片的转化，从而达到减少http请求,使得页面的性能变得越来越好。但是base64的原理是什么呢？下面我来详细介绍下base64

###### 一、base64的概念

   - 定义：base64是一种基于64个可打印字符(A-Z、a-z、0-9、+、/)来表示**二进制数据**的表示方法,末尾用=做后缀。

###### 二、base64的历史背景，也就是为什么要用base64

   - 在我们计算机中,都是以二进制的方式去存储的。
   - 那为什么以二进制的方式存储呢,其实这个要取决于我们的电脑的电路组成方式。上过数字电路或者其他电子课程的同学就知道，电路的开和关,通过开关的不同组合,就形成0101的方式。所以就导致了我们在计算机中的存储方式都是二进制的。下面就是数字电路实验箱的部分：

    <img src="images/base64/shuzidianlu.jpeg"> 

   - Base64最早是用来解决电子邮件的传输问题。传统的电子邮件是1982年定下的技术规范，该规范的一个重要预留点,就是规定电子邮件只能使用ASCII可打印字符。而ASCII码的128~255都是不可见字符。在网络上交换数据的时候，经过不同路由设备,由于不同的设备对字符的处理方式有一些不同，就很有可能被错误处理,不利于传输。
   - 解决这个问题，最好的方法就是在不改变传统协议的情况下，做一种扩展方法来支持为二进制文件的传送，把不可打印字符也能用可打印字符来表示二进制数据。因此base64编码这种基于64个可打印字符来表示二进制数据的方法就诞生了。

    [ascii码表在线查询](https://www.litefeel.com/tools/ascii.php)

###### 三、base64的原理

   1. 首先定义了base64的索引表如下：

    <img src="images/base64/index.jpg"> 

   2. 三个字节的情况：base64将每3个8bits字节转换成4个6bit字节(3x8 = 4x6 =24),然后将转换后的6bit往高位添加2个0，组成4个8bit的字节,再根据这4个8bit的十进制在上面的索引表中查找对应的值,此时得到的结果就是base64的值了。
 
     因此,理论上，**转换后的字符串的长度要比原来的字符串长1/3,(8/24)**

    **举个例子**

   在[base64在线转码工具](http://tool.oschina.net/encrypt?type=3)中,可以直接看到'Ow!'转换成'T3ch',那这个是怎么转换的呢？下面细细说来:

    ```
        (1)字符串'Ow!'被拆分成3个8位的字节(0x4F, 0x77, 0x21);(十六进制表示)    
        (2)然后转化成二进制 01001111 01110111 00100001;
        (3)然后划分成6位的序列就是 010011 110111 011100 100001;
        (4)每个6位都值都表示从0~63之间的数,转化为十进制就是:010011=>19  110111=>55  011100=>28  100001=>33,对照base64的索引表,得到T3ch
    ```

     解读：首先,以3个8bits的字符为一组,针对每组数据,获取每个字符的ascii编码。然后,转化成对应的二进制,再把二进制划分成6位的的序列,每个6位的数值在转换的时候,先将3字节的数据,先后放入一个24位的缓冲区(就是用来临时存放输入输出东西的存储器)中,先来的字节占高位。数据不足3字节的话，与缓冲器中剩下的bit用0补助。由于2^6 = 64,所以每6个bit为一个单位,对应某个可打印字符。

   上面例子写成代码就是
   ```
        var toEight = function(str) {
			while (str.length < 8) {                     // 填充为8位
				str = '0' + str;
			}
			return str;
		};
		var stringToBase64 = function(str) {
			var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var binary = [];
			for(var i = 0; i < str.length; i++) {
				var binStr = str.charCodeAt(i).toString(2);     // 先将每一项转化为Unicode码,然后转化为二进制。
				binary.push(toEight(binStr));                            
			}
			var strArray = binary.join('').replace(/\B(?=(\d{6})+(?!\d))/g, ',').split(',');   // 数组成字符串再取6位,转成数组
			var resultStr = '';
			for(var i = 0; i < strArray.length; i++) {
				var everyStr = _keyStr.charAt(parseInt(toEight(strArray[i]), 2));    // 先将每个二进制转成十进制，然后在keyStr中取得索引，就转成对应的base64码
				resultStr += everyStr;
			}
			return resultStr;
		}
		var testStr = 'Ow!';
		var resultStr = stringToBase64(testStr);
		console.log('字符' + testStr + '最后得到的base64编码为' +  resultStr);
   ```

   3. 那两个字节的情况就是，先转化为二进制，2个字节就转成16个bit，然后按6位去拆分, 就是6 6 4,前面2个6位依然是在前面补两个0,然后最后1个4位就在最后也补2个0，就形成了3个8位, 然后再转成十进制,对比base64编码,就得出对应的编码了。注意这时候要在末尾补个**=**哦！

    举个例子：
    ```
        (1)字符串'Ow'被拆分成2个8位的字节(0x4F, 0x77);(十六进制表示)    
        (2)然后转化成二进制 01001111 01110111;
        (3)然后划分成6位的序列就是 010011 110111 0111;
        (4)按规则补成8位就是 00010011 00110111 00011100
        (5)每个8位二进制转化为十进制就是,00010011=>19  00110111=>55  00011100=>28,对照base64的索引表,得到T3c
        (6)最后补成四位就是T3c=
    ```
    
   4. 最后还有个一个字节的情况。就是1个字节，有8个二进制，按6位去拆，分成6 2，然后6还是前面还是加2个0，2就在前面加两个0的基础上后面再加4个0。形成2个8进制，转化成十进制，对照base64，形成对应的编码，然后在末尾补两个=就是*==*。

       我又来举个例子了：
    ```
        (1)字符串'O'被拆分成1个8位的字节(0x4F);(十六进制表示)    
        (2)然后转化成二进制 01001111;
        (3)然后划分成6位的序列就是 010011 11;
        (4)按规则补成8位就是 00010011 00110000
        (5)每个8位二进制转化为十进制就是,00010011=>19  00110111=>48,对照base64的索引表,得到Tw
        (6)最后补成四位就是Tw==
    ```

   5. 那么中文应该怎么转化呢？
  
    其实汉字有多种编码,比如utf-8等等，每种编码对应的base64对应值都不一样，有gb2312，utf-8,gbk等，因为我们一般用的utf-8,接下来就以utf-8为例。
    首先，‘严’的utf-8的编码是E4B8A5,(为什么是这样呢，可以根据base64参考，[utf-8编码](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)),那转换为二进制就是 1110 0100 1011 1000 1010 0101。然后将这个二进制字符串，按照3个字节的规则，先每6位分一次，然后前面加2个0,就形成一组32位的二进制： 00111001 00001011 00100010 00100101。相应的十进制就是57,11,34,37.对应的base64值就是5Lil

   6. URL安全的base64编码。
   当标准的base64在URL中传输时,URL编辑器会把标准base64中的‘/’和‘+’字符变成形如‘%XX’的形式。而且%号在存入数据库时还需要进行转换。因为SQL中已将%号用作通配符。
   这时就采用一种用户URL的改进base64编码,它不在末尾填充'='号，并将标准base64中的+和/改成了-和_,免去了URL编解码和数据库存储时所要作的转换。

   7. html5将图片转换成base64代码,base64可以放在url中使用,将图片转成base64,图片可以以字符编码的形式直接传递到客户端，而文件形式需要进行http请求。虽然会多1/3,但是通过gzip优化以后就差不多了。在html5中,有一个接口[FileReader.readAsDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)。这个接口可以直接将文件转换为base64编码格式。。并以Data:URL的形式展现出来。示例代码如下：

	```
		<script>
        window.onload = function () {
            // 抓取上传图片，转换代码结果，显示图片的dom
            var img_upload = document.getElementById("img_upload");
            var base64_code = document.getElementById("base64_code");
            var img_area = document.getElementById("img_area");
            // 添加功能出发监听事件
            img_upload.addEventListener('change', readFile, false);
        }
        function readFile() {
            var file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                base64_code.innerHTML = this.result;
                img_area.innerHTML = '<div>图片img标签展示：</div><img src="' + this.result + '" alt=""/>';
            }
        }
		</script>
		<input type="file" id="img_upload" />
		<textarea id="base64_code" rows="30" cols="360"></textarea>
		<p id="img_area"></p>

	```

   8. js中有个办法window.btoa可以直接转换成base64,window.atob转成字符串。
    ```
        var encodedData = window.btoa("Hello, world");   // SGVsbG8gV29ybGQ=
        var decodedData = window.atob(encodedData);      // Hello World
    ```
    但是在函数中,只能转化字符串,不支持unicode字符串,所以可以通过函数变通。
    ```
        window.btoa(unescape(encodeURIComponent(str)));   // 转化成base64编码
        decodeURIComponent(escape(window.atob(str)));   // 转成字符串。
    ```

   9. 最后上base64转换的完整代码
    ```
        
        (function (win, undefined) {
		    var Base64 = function () {
		        var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		        
		        // btoa method
		        function _btoa (s) {
		            if (/([^\u0000-\u00ff])/.test(s)) {
		                throw new Error('INVALID_CHARACTER_ERR');
		            }    
		            var i = 0,
		                prev,
		                ascii,
		                mod,
		                result = [];

		            while (i < s.length) {
		                ascii = s.charCodeAt(i);
		                mod = i % 3;

		                switch(mod) {
		                    // 第一个6位只需要让8位二进制右移两位
		                    case 0:
		                        result.push(base64hash.charAt(ascii >> 2));
		                        break;
		                    //第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
		                    case 1:
		                        result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
		                        break;
		                    //第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
		                    //第4个6位 = 第三个8位的后6位
		                    case 2:
		                        result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
		                        result.push(base64hash.charAt(ascii & 0x3f));
		                        break;
		                }

		                prev = ascii;
		                i ++;
		            }

		            // 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
		            // mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
		            if(mod == 0) {
		                result.push(base64hash.charAt((prev & 3) << 4));
		                result.push('==');
		            } else if (mod == 1) {
		                result.push(base64hash.charAt((prev & 0x0f) << 2));
		                result.push('=');
		            }

		            return result.join('');
		        }

		        // atob method
		        // 逆转encode的思路即可
		        function _atob (s) {
		            s = s.replace(/\s|=/g, '');
		            var cur,
		                prev,
		                mod,
		                i = 0,
		                result = [];

		            while (i < s.length) {
		                cur = base64hash.indexOf(s.charAt(i));
		                mod = i % 4;

		                switch (mod) {
		                    case 0:
		                        //TODO
		                        break;
		                    case 1:
		                        result.push(String.fromCharCode(prev << 2 | cur >> 4));
		                        break;
		                    case 2:
		                        result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
		                        break;
		                    case 3:
		                        result.push(String.fromCharCode((prev & 3) << 6 | cur));
		                        break;
		                        
		                }

		                prev = cur;
		                i ++;
		            }

		            return result.join('');
		        }

		        return {
		            btoa: _btoa,
		            atob: _atob,
		            encode: _btoa,
		            decode: _atob
		        };
		    }();

		    if (!win.Base64) { win.Base64 = Base64 }
		    if (!win.btoa) { win.btoa = Base64.btoa }
		    if (!win.atob) { win.atob = Base64.atob }

		})(window);
    ```

###### 四、base64的用途

   - 可用来作为电子邮件的传输编码。
   - 处理文本数据的场合,表示传输、存储一些二进制数据，包括MIME的电子邮件及XML的一些复杂数据。
   - 可以将图片转化为base64进行传输。
   - 等等。。。