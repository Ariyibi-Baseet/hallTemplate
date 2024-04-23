(function($){
    "use strict";

    $(document).on('ready', function () {
        var $headroomStr = "ct-js-headroom";
        var $headroomCla = ".ct-js-headroom";
        var $topBarStr = "ct-topBar";
        var $navBarStr = "navbar";
        var $bodyel = jQuery("body");
        var $navbarel = jQuery(".navbar");
        var $topbarel = jQuery(".ct-topBar");

        if($bodyel.hasClass("ct-headroom--scrollUpMenu")){
            $navbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--scrollUpTopBar")){
            $topbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--scrollUpBoth")){
            var $scrollUpBoth = true;
            $topbarel.addClass($headroomStr);
            $navbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--fixedTopBar")){
            var $fixedTopBar = true;
            $topbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--fixedMenu")){
            var $fixedMenu = true;
            $navbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--fixedBoth")){
            var $fixedBoth = true;
            var $scrollUpBoth = true;
            $topbarel.addClass($headroomStr);
            $navbarel.addClass($headroomStr);
        }
        else if($bodyel.hasClass("ct-headroom--hideMenu")){
            var $fixedScrollUpTopBar = true;
            var $scrollUpTopBar = true;
            $topbarel.addClass($headroomStr);
            $navbarel.addClass($headroomStr);
        }
        else{
            return;
        }

        if($($headroomCla).length > 0){
            $($headroomCla).each(function(){
                var $this = $(this);

                //Position of the topBar and navbar, when (scroll position) we grab it
                var $startPositionTopBar = 0;
                var $startPositionNavbar = 118;

                var ctstarttopbar = validatedata($this.attr("data-starttopbar"), $startPositionTopBar); //default position 0
                var ctstartnavbar = validatedata($this.attr("data-startnavbar"), $startPositionNavbar); //default position 170
                $(window).on('scroll', function(){
                    var scrollPos = $(window).scrollTop();

                    if ($this.hasClass($topBarStr)){
                        if (scrollPos > ctstarttopbar){
                            $this.addClass("navbar-scroll-top");
                        }
                        else{
                            $this.removeClass("navbar-scroll-top");
                        }
                    }
                    else if($this.hasClass($navBarStr)){
                        if (scrollPos >  ctstartnavbar){
                            $this.addClass("navbar-scroll-top");

                            if($scrollUpBoth || $scrollUpTopBar){
                                //this attribute we put in navbar only if we use ct-headroom--scrollUpBoth, ct-headroom--fixedBoth, ct-headroom--hideMenu
                                var ctheighttopbar = validatedata($this.attr("data-heighttopbar"), "50px"); // height of topbar needed for positiong menu below topbar exact how height is topbar :)
                                $this.css("top",ctheighttopbar); //add 50px for menu coz topbar has 50px, we want to put it below
                            }
                        }
                        else{
                            $this.removeClass("navbar-scroll-top");
                            if($scrollUpBoth || $scrollUpTopBar){
                                $this.css("top","auto");
                            }
                        }
                    }
                    if ($devicewidth > 768){
                        var $topBarHeight = $('.ct-topBar').innerHeight(),
                            $navBarHeight = $('.navbar').innerHeight();
                        if ($('.navbar').hasClass('navbar-fixed')){
                            return false
                        }
                        else{
                            if ($bodyel.hasClass('ct-headroom--fixedTopBar') || $bodyel.hasClass('ct-headroom--scrollUpTopBar')){
                                if ($('.ct-topBar').length > 0){
                                    if ($('.ct-topBar').hasClass('navbar-scroll-top')){
                                        $bodyel.css('padding-top', $topBarHeight);
                                    }
                                    else {
                                        $bodyel.css('padding-top', '0');
                                    }
                                }
                            }
                            if ($bodyel.hasClass('ct-headroom--fixedMenu') || $bodyel.hasClass('ct-headroom--scrollUpMenu')){
                                if ($('.navbar').length > 0){
                                    if ($('.navbar').hasClass('navbar-scroll-top')){
                                        $bodyel.css('padding-top', $navBarHeight);
                                        if(scrollPos > 150){
                                            $('.navbar').css({
                                                paddingTop: "20px",
                                                paddingBottom: "10px"
                                            });
                                        }
                                        else if(scrollPos < 151 ){
                                            $('.navbar').css({
                                                paddingTop: "40px",
                                                paddingBottom: "30px"
                                            });
                                        }
                                    }
                                    else {
                                        $bodyel.css('padding-top', '0');
                                    }
                                }
                            }
                            if ($bodyel.hasClass('ct-headroom--fixedBoth') || $bodyel.hasClass('ct-headroom--scrollUpBoth')){
                                if ($('.navbar').length > 0 && $('.ct-topBar').length > 0){
                                    var $headerHeight = $topBarHeight + $navBarHeight;
                                    if ($('.ct-topBar').hasClass('navbar-scroll-top')){
                                        $bodyel.css('padding-top', $headerHeight);
                                    }
                                    else {
                                        $bodyel.css('padding-top', '0');
                                    }
                                }
                            }
                            if ($('html').hasClass('ie8') || $('html').hasClass('ie9')){

                            }
                        }

                    }
                });


                var ctoffset = validatedata($this.attr("data-offset"), 205); //this is the offset when taken elements have to disappear

                var cttolerance = validatedata($this.attr("data-tolerance"), 5); /// you can specify tolerance individually for up/down scroll
                var ctinitiial = validatedata($this.attr("data-initial"), "animatedHeadroom"); // when element is initialised
                var cttop = validatedata($this.attr("data-top"), "headroom--top");  // when above offset
                var ctnotTop = validatedata($this.attr("data-top"), "headroom--not-top"); // when below offset

                if($fixedScrollUpTopBar){
                    if($this.hasClass("ct-topBar")){
                        var $fixedScrollUpTopBarConfirmed = true;
                    }
                }

                if($fixedBoth || $fixedTopBar || $fixedMenu || $fixedScrollUpTopBarConfirmed){
                    //if you want to fix elements for good, then we should change variables so that they are with the same name, no matter what
                    var ctpinned = validatedata($this.attr("data-pinned"), "IAmFixed");
                    var ctunpinned = validatedata($this.attr("data-unpinned"), "IAmFixed");
                }
                else{
                    var ctpinned = validatedata($this.attr("data-pinned"), "fadeInDown"); //effect when elements appears itself -  when scrolling up
                    var ctunpinned = validatedata($this.attr("data-unpinned"), "fadeOutUp"); //effect when elements disappears itself -  when scrolling down
                }

                $this.headroom({ //do this for each element use  add .ct-js-headroom

                    "offset": ctoffset,// vertical offset in px before element is first unpinned
                    "tolerance": cttolerance, // scroll tolerance in px before state changes
                    "top": cttop, // when above offset
                    "notTop": ctnotTop, // when below offset

                    "classes": {
                        "initial": ctinitiial, // when element is initialised
                        "pinned": ctpinned, // when scrolling up
                        "unpinned": ctunpinned // when scrolling down
                    }
                });
            });
        }
    });
})(jQuery);