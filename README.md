# countdown.js
zepto/jquery 倒计时插件, 适用于抢购活动的列表页

### Demo:

https://hehaibao.github.io/countdown/index.html

### 使用方法

1. 引入zepto/jquery
2. 引入countdown.js
3. dom结构写好，例如：

```html
<ul>
    <li>1. <span data-countdown="2018/06/05 13:08:00"></span></li>
    <li>2. <span data-countdown="2040/08/05 23:11:30"></span></li>
    <li>3. <span data-countdown="2018/06/08 09:11:02"></span></li>
    <li>4. <span data-countdown="2020/02/08 10:30:39"></span></li>
    <li>5. <span data-countdown="2019/01/05 10:00:08"></span></li>
</ul>
```

4. 调用

```javascript
(function(){
    //默认调用
    // $('[data-countdown]').countdown();

    //自定义调用
    $('[data-countdown]').countdown({
        txt: '距离活动结束还有：',
        sp: '-',
        callback: function(v){
            //活动结束后的回调
            $(v).parents('li').addClass('red');
        }
    });
}());
```

