### 解析md5算法

* MD5实现128bit的Hash值的密码散列函数

1. MD5的作用
  - 在传输的时候，进行加密，防止恶意窃取数据。
2. MD5算法的原理：
  - 填充输入信息，使其字节长度对512求余数为448.
  - 信息的长度扩展为N*512+448 bit N为整数。然后将每个512bit的组分为16个32bit子分组，最后经过一系列的算法生成4个32bit共128bit的散列值
3. MD5算法的实现：
 
    >  
        1 /* eslint-disable */
        2 var jQuery = require('jquery');
        3 (function($){
        4   var rotateLeft = function(lValue, iShiftBits) {
        5     return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        6   }
        7   var addUnsigned = function(lX, lY) {
        8     var lX4, lY4, lX8, lY8, lResult;
        9     lX8 = (lX & 0x80000000);
        10     lY8 = (lY & 0x80000000);
        11     lX4 = (lX & 0x40000000);
        12     lY4 = (lY & 0x40000000);
        13     lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        14     if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        15     if (lX4 | lY4) {
        16       if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        17       else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        18     } else {
        19       return (lResult ^ lX8 ^ lY8);
        20     }
        21   }
        22   var F = function(x, y, z) {
        23     return (x & y) | ((~ x) & z);
        24   }
        25   var G = function(x, y, z) {
        26     return (x & z) | (y & (~ z));
        27   }
        28   var H = function(x, y, z) {
        29     return (x ^ y ^ z);
        30   }
        31   var I = function(x, y, z) {
        32     return (y ^ (x | (~ z)));
        33   }
        34   var FF = function(a, b, c, d, x, s, ac) {
        35     a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        36     return addUnsigned(rotateLeft(a, s), b);
        37   };
        38   var GG = function(a, b, c, d, x, s, ac) {
        39     a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        40     return addUnsigned(rotateLeft(a, s), b);
        41   };
        42   var HH = function(a, b, c, d, x, s, ac) {
        43     a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        44     return addUnsigned(rotateLeft(a, s), b);
        45   };
        46   var II = function(a, b, c, d, x, s, ac) {
        47     a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        48     return addUnsigned(rotateLeft(a, s), b);
        49   };
        50   var convertToWordArray = function(string) {
        51     var lWordCount;
        52     var lMessageLength = string.length;
        53     var lNumberOfWordsTempOne = lMessageLength + 8;
        54     var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        55     var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        56     var lWordArray = Array(lNumberOfWords - 1);
        57     var lBytePosition = 0;
        58     var lByteCount = 0;
        59     while (lByteCount < lMessageLength) {
        60       lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        61       lBytePosition = (lByteCount % 4) * 8;
        62       lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
        63       lByteCount++;
        64     }
        65     lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        66     lBytePosition = (lByteCount % 4) * 8;
        67     lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        68     lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        69     lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        70     return lWordArray;
        71   };
        72   var wordToHex = function(lValue) {
        73     var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        74     for (lCount = 0; lCount <= 3; lCount++) {
        75       lByte = (lValue >>> (lCount * 8)) & 255;
        76       WordToHexValueTemp = "0" + lByte.toString(16);
        77       WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        78     }
        79     return WordToHexValue;
        80   };
        81   var uTF8Encode = function(string) {
        82     string = string.replace(/\x0d\x0a/g, "\x0a");
        83     var output = "";
        84     for (var n = 0; n < string.length; n++) {
        85       var c = string.charCodeAt(n);
        86       if (c < 128) {
        87         output += String.fromCharCode(c);
        88       } else if ((c > 127) && (c < 2048)) {
        89         output += String.fromCharCode((c >> 6) | 192);
        90         output += String.fromCharCode((c & 63) | 128);
        91       } else {
        92         output += String.fromCharCode((c >> 12) | 224);
        93         output += String.fromCharCode(((c >> 6) & 63) | 128);
        94         output += String.fromCharCode((c & 63) | 128);
        95       }
        96     }
        97     return output;
        98   };
        99   $.extend({
        100     md5: function(string) {
        101       var x = Array();
        102       var k, AA, BB, CC, DD, a, b, c, d;
        103       var S11=7, S12=12, S13=17, S14=22;
        104       var S21=5, S22=9 , S23=14, S24=20;
        105       var S31=4, S32=11, S33=16, S34=23;
        106       var S41=6, S42=10, S43=15, S44=21;
        107       string = uTF8Encode(string);
        108       x = convertToWordArray(string);
        109       a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        110       for (k = 0; k < x.length; k += 16) {
        111         AA = a; BB = b; CC = c; DD = d;
        112         a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
        113         d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
        114         c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
        115         b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
        116         a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
        117         d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
        118         c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
        119         b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
        120         a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
        121         d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
        122         c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
        123         b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
        124         a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
        125         d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
        126         c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
        127         b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
        128         a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
        129         d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
        130         c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
        131         b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
        132         a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
        133         d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
        134         c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
        135         b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
        136         a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
        137         d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
        138         c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
        139         b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
        140         a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
        141         d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
        142         c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
        143         b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
        144         a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
        145         d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
        146         c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
        147         b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
        148         a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
        149         d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
        150         c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
        151         b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
        152         a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
        153         d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
        154         c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
        155         b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
        156         a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
        157         d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
        158         c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
        159         b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
        160         a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
        161         d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
        162         c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
        163         b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
        164         a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
        165         d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
        166         c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
        167         b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
        168         a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
        169         d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
        170         c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
        171         b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
        172         a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
        173         d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
        174         c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
        175         b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
        176         a = addUnsigned(a, AA);
        177         b = addUnsigned(b, BB);
        178         c = addUnsigned(c, CC);
        179         d = addUnsigned(d, DD);
        180       }
        181       var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        182       return tempValue.toLowerCase();
        183     }
        184   });
        185 })(jQuery);