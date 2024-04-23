(function ($) {
    "use strict";
    $(window).on('load', function() {
        var $datePicker = $('.ct-js-datePicker');
        if ($().datepicker){
            if ($datePicker.length > 0) {
                $datePicker.each(function(){
                    var $this = $(this),
                        $todayHighlight = parseBoolean($this.attr("data-todayHighlight"), true),
                        $calendarWeeks = parseBoolean($this.attr("data-calendarWeeks"), false),
                        $autoClose = parseBoolean($this.attr("data-autoClose"), true),
                        $keyboardNavigation = parseBoolean($this.attr("data-keyboardNavigation"), false);
                    $this.datepicker({
                        todayHighlight: $todayHighlight,
                        calendarWeeks: $calendarWeeks,
                        autoclose: $autoClose,
                        keyboardNavigation: $keyboardNavigation
                    });
                    var $a = $('.ct-js-datePicker'),
                        $b = $a.innerWidth();
                    $a.on('focus', function() {
                        var $datepicker = $('.datepicker');
                        $datepicker.css('min-width', $b);
                        $datepicker.find('table').css('width', '100%');
                    });
                });
            }
        }
    });
})(jQuery);