$(document).ready(function() {
    var $content = $('.content');
    var $header = document.querySelector('.header');
    var oh = $header.offsetHeight;
    var ah = window.screen.availHeight;
    var $bar = document.querySelector('.bar');
    var flag1 = true;
    var flag2 = false;
    var $backTop = document.createElement("div");
    $(window).on({
        scroll: function() {
            var sy = window.scrollY || window.pageYOffset;
            flag1 && sy > oh ? (flag1 = false, $bar.style.position = 'fixed', $bar.style.top = '0') : !flag1 && oh >= sy && (flag1 = true, $bar.style.position = 'absolute', $bar.style.top = oh + 'px');
            !flag2 && sy >= ah ? ($backTop.style.display = 'block', flag2 = true) : flag2 && ah > sy && ($backTop.style.display = 'none', flag2 = false);
        },
        resize: function() {
            oh = $header.offsetHeight;
            if($bar.style.top != '0px') {
                $bar.style.top = oh + 'px';
            } else {
                $bar.style.top = '0';
            }
            setTimeout(function() {
                $content.css('height', '');
                var contentH = $content.height();
                var footerH = $('.footer').height();
                var clientH = document.documentElement.clientHeight;
                if(clientH - 64 - oh - footerH >= contentH) {
                    $content.css('height', clientH - 64 - oh - footerH + 'px');
                }
            }, 0);
        }
    });
    $(window).resize();
    $backTop.setAttribute('class', 'back_top_div');
    document.body.appendChild($backTop);
    $backTop.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    new ScrollReveal({
        reset: false,
        move: '50px',
        mobile: true,
        useDelay: 'always',
        duration: 700
    });
});