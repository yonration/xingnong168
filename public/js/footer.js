$(document).ready(function() {
    var tm = new TimelineMax({paused: !0});
    var $qr = $('.footer .wrapper .qr');
    var $img = $qr.find('img');
    tm.from($img, .45, {
        y: -10,
        autoAlpha: 0,
        ease: Ease.easeIn
    });
    $qr.hover(function() {
        tm.play();
    }, function() {
        tm.timeScale(2.5).reverse();
    })
});