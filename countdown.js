/*
* Zepto/jQuery 倒计时插件
* by haibao[http://www.hehaibao.com/]
*/
;(function ($) {

    $.fn.countdown = function (options) {
        function countDown() {
            this.$element = null; //DOM
            this.$childEl = options && options.child || '.countdown-box'; //子元素DOM,用于 有特殊自定义模板时
            this.txt = options && options.txt || '距结束'; //提示文字
            this.sp = options && options.sp || ':'; //分隔符
            this.isZh = options && options.isZh || false; //是否在模板中提示中文
            this.tpl = ''; //模板【格式默认：天:时:分:秒】
            this.dateValue = ''; //截止日期
            this.timer = null; //计时器
        }
        countDown.prototype =  {
            init: function(dom) {
                this.$element = dom;
                this.dateValue = $(dom).data("countdown");
                if(this.dateValue) {
                    this.dateValue = this.dateValue.replace(/-/g, "/");
                    this.dateValue = Math.round((new Date(this.dateValue)).getTime() / 1000);
                    this.start();
                }
            },
            start: function() {
                var range = this.dateValue - Math.round((new Date()).getTime() / 1000),
                    secDay = 86400,
                    secHour = 3600,
                    days = parseInt(range / secDay),
                    hours = parseInt((range % secDay) / secHour),
                    min = parseInt(((range % secDay) % secHour) / 60),
                    sec = parseInt(((range % secDay) % secHour) % 60),
                    $box = this.$element.find(this.$childEl);

                if(range <= 0) {
                    //活动结束
                    this.tpl = '活动已结束';
                    this.dateValue = '';
                    this.$element.data('countdown', '');
                    if(options && options.callback && Array.prototype.toString.call(options.callback) === '[object Function]') {
                        options.callback(this.$element); //用于处理结束后的回调
                    }
                } else {
                     //定义输出的模板
                    if(this.isZh) {
                        //中文提示 模板
                        this.tpl = this.txt + '<span class="d">'+this.format(days)+'</span>天<span class="h">'+this.format(hours)+'</span>时<span class="m">'+this.format(min)+'</span>分<span class="s">'+this.format(sec)+'</span>秒';
                    } else {
                        //符号提示 模板
                        this.tpl = this.txt + '<span class="d">'+this.format(days)+'</span>'+this.sp+'<span class="h">'+this.format(hours)+'</span>'+this.sp+'<span class="m">'+this.format(min)+'</span>'+this.sp+'<span class="s">'+this.format(sec)+'</span>';
                    }
                }

                if($box.length) {
                    $box.html(this.tpl);
                } else {
                    this.$element.html(this.tpl);
                }

            },
            format: function(h) {
                return h > 9 ? h : '0' + h;
            }
        }

        return this.each(function () {
            var countdown = new countDown();
            var $el = $(this);
            countdown.init($el);

            countdown.timer = setInterval(function(){
                countdown.init($el);
            }, 1000);
        });
    }

})(window.jQuery || window.Zepto);