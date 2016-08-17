/*!
 * Agency v1.0.x (http://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
var rcid = -1;

function recaptchaCallback(response) {
    if (response && response.length > 0) {
        $("#contactForm").submit();
    }
}


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    $('[data-toggle="popover"]').popover();

    $('#contactsubmit').on('inserted.bs.popover', function () {
        if (rcid < 0) {
            rcid = grecaptcha.render('recaptcha', {
              'sitekey' : '6LdmdScTAAAAAJz4Ysikf5-YKfCws0SLplJR6TZR',
              'callback': recaptchaCallback
            });
        }
    });
    $('#contactsubmit').on('hide.bs.popover', function () {
            grecaptcha.reset(rcid);
            rcid = -1;
    })


    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            //return;
            event.preventDefault(); // prevent default submit behaviour
            if (rcid < 0) {
                $('#contactsubmit').popover('show');
                return;
            }
            var response = grecaptcha.getResponse(rcid);
            if (!response || response.length <= 0) {
                return;
            }
            $('#contactsubmit').popover('hide');
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/caro@alltagshunde-bonn.de",
                type: "POST",
                data: {
                    _subject: 'Anfrage auf alltagshunde-bonn.de',
                    //_replyto: email,
                    _format: 'plain',
                    Name: name,
                    Email: email,                                        
                    Telefon: phone,
                    Nachricht: message
                },
                dataType: "json",
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Ihre Nachricht wurde gesendet. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später noch einmal!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});