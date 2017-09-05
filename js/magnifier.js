;(function (win, $) {
    var magnifier = function (obj) {
        var _this = this;
        this.obj = $(obj);

        this.sbox = this.obj.find('.small-pic');
        this.bpic = this.obj.find('.big-pic img');
        this.pointer = this.obj.find('.small-pic .pointer');
        this.times = this.sbox.attr('data-size') || 2.5;
        this.sw = this.sbox.width();
        this.sh = this.sbox.height();
        this.bw = this.sw * this.times;
        this.bh = this.sh * this.times;
        this.left = 0;
        this.top = 0;

        this.pointerInitSize ();
        this.sboxMousemoveEvent ();
        this.sboxHoverEvent ();
    };
    magnifier.prototype = {
        sboxMousemoveEvent : function () {
            var _this = this;
            this.sbox.mousemove(function (e) {
                var _vm = $(this);
                _this.top = _vm.get(0).getBoundingClientRect().top;
                _this.left = _vm.get(0).getBoundingClientRect().left;
                var bx = e.clientX - _this.left;
                var by = e.clientY - _this.top;
                var pw = _this.pointer.width() + 2;
                var ph = _this.pointer.height() + 2;
                var pl = bx - pw / 2;
                var pt = by - ph / 2;
                if (pl < 0) {
                    pl = 0;
                } else if (pl > _this.sw - pw) {
                    pl = _this.sw - pw;
                }
                if (pt < 0) {
                    pt = 0;
                } else if (pt > _this.sh - ph) {
                    pt = _this.sh - ph;
                }
                _this.pointer.css({
                    left : pl + 'px',
                    top : pt + 'px'
                });
                _this.bpic.css({
                    left : -pl * _this.times + 'px',
                    top : -pt * _this.times + 'px'
                });
                _this.bpic.parent().css({display : 'block'});
            })
        },
        sboxHoverEvent : function () {
            var _this = this;
            this.sbox.hover(function () {
                _this.bpic.attr('src', _this.sbox.attr('data-src'));
                _this.bpic.css({
                    width : _this.bw + 'px',
                    height : _this.bh + 'px'
                });
                _this.pointer.css({display : 'block'});
            }, function () {
                _this.bpic.parent().css({display : 'none'});
                _this.pointer.css({display : 'none'});
            })
        },
        pointerInitSize : function () {
            this.pointer.css({
                width : this.sw / this.times + 'px',
                height : this.sh / this.times + 'px'
            });
        }
    };
    magnifier.init = function (obj) {
        var _this = this;
        for (var i = 0, l = obj.length; i < l; i++) {
            new _this(obj[i]);
        }
    };
    win['Magnifier'] = magnifier;
})(window, jQuery);
