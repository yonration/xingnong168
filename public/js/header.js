$(document).ready(function() {
    var tm = new TimelineMax({paused: !0});
    var flag = false;
    var st1, st2;
    var $window = $(window);
    var $nav = $('.header .nav');
    var $li = $('.header .nav li');
    var $menu = $('.header .nav .menu');
    var $box = $('.header .box');
    var $products = $box.find('.products');
    var $series = $box.find('.series');
    
    tm.from($box, 0.5, {height: 0});
    $li.each(function() {
        var self = this;
        self.handle1 = new TimelineMax({
            paused: !0,
            onReverseComplete: function() {
                $(self).removeClass('current');
                self.handle2.timeScale(1000).reverse();
            }
        });
        self.handle2 = new TimelineMax({
            paused: !0
        });
        if($(self).index() < $products.length) {
            var $product = $products.eq($(self).index());
            var $items = $product.find('.item');
            self.handle1.from($product, 0.45, {
                autoAlpha: 0,
                ease: Ease.easeIn
            })
            self.handle2.staggerFrom($items, .45, {
                y: -25,
                autoAlpha: 0,
                ease: Ease.easeIn
            }, .1, '+=.1');
            $items.each(function() {
                var $img = $(this).find('img');
                var that = this;
                var st1, st2;
                this.handle = new TimelineMax({
                    paused: !0
                });
                this.handle.to($img, 0.45, {
                    y: -10
                }, .1, 'a');
                $(this).hover(function() {
                    clearTimeout(st1, st2);
                    st1 = setTimeout(function() {
                        that.handle.play();
                    }, 100);
                }, function() {
                    st2 = setTimeout(function() {
                        that.handle.reverse();
                    }, 100);
                });
            })
        } else {
            var $serie = $series.eq($(self).index() - $products.length);
            var $ul = $serie.find('ul');
            self.handle1.from($serie, 0.45, {
                autoAlpha: 0,
                ease: Ease.easeIn
            })
            $ul.each(function() {
                self.handle2.add(TweenMax.staggerFrom($(this).find('li'), .5, {
                    y: -50,
                    autoAlpha: 0,
                    ease: Ease.easeIn
                }, .1), 'a');
            });
            self.handle2.from($ul, .5, {
                height: 0
            }, .3)
        }
        TweenMax.set($box, {
            autoAlpha: 1
        });
        $(self).hover(function() {
            clearTimeout(st1, st2);
            $(self).addClass('current');
            st1 = setTimeout(function() {
                tm.timeScale(1.5).play();
                self.handle1.timeScale(.7).play();
                self.handle2.timeScale(1.2).play();
            }, 10);
        }, function() {
            flag = false;
            st2 = setTimeout(function() {
                flag || (tm.timeScale(1.5).reverse(), self.handle1.timeScale(2.5).reverse());
            }, 10);
        });
    });
    $menu[0].handle = new TimelineMax({
        paused: !0
    });
    $menu[0].handle.staggerFrom($li, .2, {
        scale: 1.1,
        x: -20,
        y: -20,
        autoAlpha: 0,
        ease: Ease.easeOut
    }, .05);
    $menu.click(function() {
        $nav.hasClass('open') ? ($nav.removeClass('open'), this.handle.timeScale(2.5).reverse(), $('html').removeClass('limit')) : ($nav.addClass('open'), this.handle.seek(0).timeScale(1).play(), $('html').addClass('limit'));
    });
    $box.hover(function() {
        flag = true;
    }, function() {
        flag = false;
        $li.mouseleave();
    });
    $window.on({
        resize: function() {
            document.documentElement.clientWidth >= 768 ? $li.attr('style', '') : $li.attr('style', 'visibility: hidden; opacity: 0; transform: matrix(1.1, 0, 0, 1.1, -20, -20);');
            document.documentElement.clientWidth >= 1279 ? $li.find('a').each(function() {
                $(this).removeAttr('href', this.dataset.href);
            }) : $li.find('a').each(function() {
                $(this).attr('href', this.dataset.href);
            });
        }
    });
    $window.resize();
});