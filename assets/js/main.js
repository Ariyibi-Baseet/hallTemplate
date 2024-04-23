/* global jQuery */
"use strict";

/**
 * createIT main javascript file.
 */

var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var $bodyel = jQuery("body");
var $navbarel = jQuery(".navbar");

var $lgWidth = 1199;
var $mdWidth = 991;
var $smWidth = 767;
var $xsWidth = 479;

/* ========================== */
/* ==== HELPER FUNCTIONS ==== */

function validatedata($attr, $defaultValue) {
    if ($attr !== undefined) {
        return $attr
    }
    return $defaultValue;
}

function parseBoolean(str, $defaultValue) {
    if (str == 'true') {
        return true;
    } else if (str == "false") {
        return false;
    }
    return $defaultValue;
}

(function () {
  var $ = jQuery;

    if (document.getElementById('ct-js-wrapper')) {
        var snapper = new Snap({
            element: document.getElementById('ct-js-wrapper')
        });

        snapper.settings({
            disable: "left",
            easing: 'ease',
            addBodyClasses: true,
            touchToDrag: false
        });
    }

    $(document).on('ready', function () {

        // Text Color
        if ($('[data-color]').length > 0) {
            $('[data-color]').each(function () {
                var $this = $(this);
                $this.css("color", $this.attr('data-color'));
            });
        }

        // Background Color
        if ($('[data-background]').length > 0) {
            $('[data-background]').each(function () {
                var $this = $(this),
                    $background = $(this).attr('data-background'),
                    $backgroundmobile = $(this).attr('data-background-mobile');

                if ($this.attr('data-background').substr(0, 1) === '#') {
                    $this.css('background-color', $background);
                } else if ($this.attr('data-background-mobile') && device.mobile()) {
                    $this.css('background-image', 'url(' + $backgroundmobile + ')');
                } else {
                    $this.css('background-image', 'url(' + $background + ')');
                }
            });
        }
        // Background position
        if ($('[data-background-position]').length > 0){
            $('[data-background-position]').each(function (){
                var $this = $(this),
                    $backgroundPosition = $this.attr('data-background-position'),
                    $backgroundPositionMobile = $this.attr('data-background-position-mobile');

                if ($devicewidth > device.mobile()){
                    $this.css('background-position', $backgroundPosition);
                }
                else{
                    $this.css('background-position', $backgroundPositionMobile);
                }
            });
        }
        // Background size
        if ($('[data-background-size]').length > 0){
            $('[data-background-size]').each(function (){
                var $this = $(this),
                    $backgroundSize = $this.attr('data-background-size'),
                    $backgroundSizeMobile = $this.attr('data-background-size-mobile');

                if ($devicewidth > device.mobile()){
                    $this.css('background-size', $backgroundSize);
                }
                else{
                    $this.css('background-size', $backgroundSizeMobile);
                }
            });
        }
        // Height
        if ($('[data-height]').length > 0) {
            $('[data-height]').each(function () {
                var $this = $(this),
                    $height = $this.attr('data-height');

                if ($height.indexOf("%") > -1) {
                    $this.css('min-height', $deviceheight * (parseInt($height, 10) / 100));
                } else {
                    $this.css('min-height', parseInt($height, 10) + "px");
                }
            });
        }

        // Map cords position

        if (($('[data-cord-position-top]') && $('[data-cord-position-left]')).length > 0){
            $('[data-cord-position-top], [data-cord-position-left]').each(function(){
                var $this = $(this),
                    $top = $this.attr('data-cord-position-top'),
                    $left = $this.attr('data-cord-position-left');
                $this.css({top: $top, left: $left})
            })
        }

        // Vertical Align

        if ($('[data-vertical]').length > 0){
            $('[data-vertical]').each(function () {
                var $this = $(this),
                    $vertical = $this.attr('data-vertical');
                $this.css('vertical-align', $vertical);
            });
        }

        if ($('[data-btnColor]').length > 0){
            $('[data-btnColor]').each(function () {
                var $this = $(this),
                    $btnColor = $this.attr('data-btnColor');
                $this.css('background-color', $btnColor);
                $this.css('border-color', $btnColor);
            });
        }

        // Slick - snap ignore [true] ----------------------------------------------------------------------------------

        $('.ct-js-slick').attr('data-snap-ignore', 'true'); // Ignore Slick


        // Media section -----------------------------------------------------------------------------------------------

        if ($('.ct-mediaSection').length > 0){
            var e = $('.ct-mediaSection');
            e.mediaSection();
        }

        // Add Color // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $(".ct-js-color").each(function(){
            $(this).css("color", '#' + $(this).attr("data-color"))
        });


        // Snap Navigation in Mobile // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($devicewidth > 767 && document.getElementById('ct-js-wrapper')) {
            snapper.disable();
        }

        $(".navbar-toggle").on('click', function () {
            if($bodyel.hasClass('snapjs-right')){
                snapper.close();
            } else{
                snapper.open('right');
            }
        });

        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a').on('click', function(e) {
            return false;
        });
        $('.ct-menuMobile .ct-menuMobile-navbar .dropdown > a, .ct-menuMobile .ct-menuMobile-navbar .dropdown-submenu > a').on('click', function(e){
            var $this = $(this);
            if($this.parent().hasClass('open')){
                $(this).parent().removeClass('open');
            } else{
                $(this).parent().addClass('open');
            }
            return false;
        });


        $('.ct-menuMobile .ct-menuMobile-navbar .onepage > a').on('click', function(e) {
            snapper.close();
        });

        // Animations Init // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().appear) {
            if (device.mobile() || device.tablet()) {
                $("body").removeClass("cssAnimate");
            } else {

                $('.cssAnimate .animated').appear(function () {
                    var $this = $(this);

                    $this.each(function () {
                        if ($this.data('time') != undefined) {
                            setTimeout(function () {
                                $this.addClass('activate');
                                $this.addClass($this.data('fx'));
                            }, $this.data('time'));
                        } else {
                            $this.addClass('activate');
                            $this.addClass($this.data('fx'));
                        }
                    });
                }, {accX: 50, accY: -350});
            }
        }
        if ($devicewidth <= 480){
            $('body').removeClass('cssAnimate')
        }

        // Tooltips and Popovers // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $("[data-toggle='tooltip']").tooltip();

        $("[data-toggle='popover']").popover({trigger: "focus", html: true, placement: 'top'});

        // Link Scroll to Section // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        $('.ct-js-btnScroll[href^="#"]').on('click', function(e) {
            e.preventDefault();

            var target = this.hash, $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 70
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });
        function goToByScrollMobile(id) {
            $('html,body').animate({scrollTop: $(id).offset().top}, 'slow');
        }
        $('.ct-js-btnScrollUp').on('click', function(e) {
            e.preventDefault();
            $("body,html").animate({scrollTop: 0}, 1200);
            console.log($navbarel);
            $navbarel.find('.onepage').removeClass('active');
            $navbarel.find('.onepage:first-child').addClass('active');
            return false;
        });
        $('body .ct-js-btnScroll--mobile').on('click', function () {
            $('.navbar-toggle').click();
            goToByScrollMobile($(this).attr('href'));
            return false;
        });

        // Placeholder Fallback // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if ($().placeholder) {
            $("input[placeholder],textarea[placeholder]").placeholder();
        }

        // Socials hover color //---------------------------------------------------------------------------------------

        if ($('.ct-js-socials').length > 0){
            var $socialsBox = $('.ct-js-socials'),
                $activeLink = $socialsBox.find('.ct-social-link');

            $activeLink.on('mouseover', function() {
                var $socialHoverColor = $(this).attr('data-social-hover-color');
                $(this).css('color', $socialHoverColor)
            });
            $activeLink.on('mouseleave', function() {
                $(this).css('color', 'inherit')
            });

        }



        // Slick synced // -------------------------------------------------------------------------------------------------

        $('.ct-js-seeNext').on('click', function(e) {
            e.preventDefault();
            $('.slider-for').slick('slickNext');
        });

        if (($('.slider-for') && $('.slider-nav')).length > 0){
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                asNavFor: '.slider-nav',
                centerMode: false
            });
            $('.slider-nav').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: true,
                arrows: false,
                centerMode: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }

        // Selectize // ------------------------------------------------------------------------------------------------

        if ($('.ct-js-selectize').length > 0){
            $('.ct-js-selectize').selectize({
                create: true,
                sortField: 'text'
            });
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            snapper.enable();
        } else {
            snapper.disable();
        }
    });
    
    $(window).on('scroll', function(){
        var scroll = $(window).scrollTop();

        if (scroll > 400) {
            $('.ct-js-btnScrollUp').addClass('is-active');
        } else {
            $('.ct-js-btnScrollUp').removeClass('is-active');
        }
    })

}());