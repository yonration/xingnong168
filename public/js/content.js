$(document).ready(function() {
    var $bgWrapper = $('.bg-wrapper');
    var index = 0;
    var $li = $('.content .main ul li');
    var map = {
        'animate': function($div, $figure) {
            var tm = new TimelineMax({
                paused: !0
            });
            return tm.staggerFrom($div, .3, {
                y: -50,
                autoAlpha: 0,
                ease: Ease.easeIn
            }, .08, "+=.4").add(TweenMax.from($figure.find('div').eq(0), .5, {
                y: -50,
                autoAlpha: 0,
                ease: Ease.easeIn
            }), .2).add(TweenMax.from($figure.find('div').eq(1), .5, {
                y: 50,
                autoAlpha: 0,
                ease: Ease.easeIn
            }), .2)
        }
    };
    $li.each(function() {
        this.handle =  new TimelineMax({
            paused: !0
        });
        var $div = $(this).find('.title div');
        var $figure = $(this).find(".figure");
        var type = $(this).data('type');
        this.handle = map[type]($div, $figure);
    });
    $li.eq(index)[0].handle.timeScale(.8).seek(0).play();
    (function loop() {
        var i = index + 1 >= 3 ? 0 : index + 1;
        setTimeout(function() {
            $bgWrapper.removeClass('slide-' + index).addClass('slide-' + i);
            $li.eq(i).addClass("current").siblings().removeClass("current")
            setTimeout(function() {
                $li.eq(index)[0].handle.pause();
            }, 1e3);
            $li.eq(i)[0].handle.timeScale(.8).seek(0).play();
            index = i;
            loop();
        }, 5e3);
    })();
});