/*!
 * Agency v1.0.x (http://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
var rcid = -1;
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $('[data-toggle="popover"]').popover();

    $('[data-toggle="popover"]').on('inserted.bs.popover', function () {
        if (rcid < 0) {
            rcid = grecaptcha.render('recaptcha', {
              'sitekey' : '6LdmdScTAAAAAJz4Ysikf5-YKfCws0SLplJR6TZR',
              'size': 'compact',
              'callback': 'recaptchaCallback'
            });
            console.log(rcid);
        }
    });
    $('[data-toggle="popover"]').on('hide.bs.popover', function () {
            console.log(rcid);
            grecaptcha.reset(rcid);
            //$('.popover-content').empty();
    })
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
});
