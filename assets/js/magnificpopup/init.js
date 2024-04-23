(function ($) {
    "use strict";
    $(document).on('ready', function () {
        if($.magnificPopup){
            $('.ct-js-popupGallery').each(function() { // the containers for all your galleries
                $(this).magnificPopup({
                    type: 'image',
                    mainClass: 'ct-magnificPopup--image',
                    removalDelay: 160,
                    preloader: true,
                    delegate: '.ct-js-magnificPopupImage',
                    closeBtnInside: true,
                    closeOnContentClick: false,
                    closeOnBgClick: true,
                    midClick: true,
                    gallery: {
                        enabled: true
                    },
                    callbacks: {
                        buildControls: function() {
                            // re-appends controls inside the main container
                            this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                        },
                        beforeOpen: function() {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    }
                });
            });
            $('.ct-js-videoPlay').each(function() {
                $(this).magnificPopup({
                   type:'iframe',
                   iframe: {
                       markup: '<div class="iframe-popup">'+
                       '<iframe class="mfp-iframe" frameborder="0" scrolling="no" allowtransparency="true" allowfullscreen></iframe>'+
                       '<div class="mfp-close"></div>'+
                       '</div>'
                   }
               }) ;
            });

            $('.ct-js-popupImage').each(function() {
                $(this).magnificPopup({
                   type: 'image',
                   removalDelay: 160,
                   callbacks: {
                       beforeOpen: function() {
                           // just a hack that adds mfp-anim class to markup
                           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                           this.st.mainClass = this.st.el.attr('data-effect');
                       }
                   }
               }) ;
            });
        }
    });
})(jQuery);