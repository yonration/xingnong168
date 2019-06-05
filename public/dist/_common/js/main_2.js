$(document).ready(function() {
    var $content = $('.content');
    var $header = document.querySelector('.header');
    var oh = $header.offsetHeight;
    var $backTop = document.createElement("div");
    var tm = new TimelineMax();
    var $shadow = $('.shadow');
    $(window).on({
        resize: function() {
            oh = $header.offsetHeight;
            setTimeout(function() {
                $content.css('height', '');
                var contentH = $content.height();
                var footerH = $('.footer').height();
                var clientH = document.documentElement.clientHeight;
                if(clientH - oh - footerH >= contentH) {
                    $content.css('height', clientH - oh - footerH + 'px');
                }
            }, 0);
        }
    });
    tm.staggerFrom($shadow, .45, {
        x: -40,
        autoAlpha: 0,
        ease: Ease.easeIn
    }, .1, '+=.1');
    document.documentElement.clientWidth >= 1280 ? $shadow.hover(function() {
        $(this).find('.effect-3').addClass('hover');
    }, function() {
        $(this).find('.effect-3').removeClass('hover');
    }) : $(this).find('.effect-3').addClass('hover');
    $(window).resize();
    $backTop.setAttribute('class', 'back_top_div');
    document.body.appendChild($backTop);
    $backTop.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
});