///// Responsive Menu /////

function darken_screen(yesno) {
  if (yesno == true) {
    document.querySelector(".screen-darken").classList.add("active");
  } else if (yesno == false) {
    document.querySelector(".screen-darken").classList.remove("active");
  }
}

function close_offcanvas() {
  darken_screen(false);
  document.querySelector(".mobile-offcanvas.show").classList.remove("show");
  document.body.classList.remove("offcanvas-active");
}

function show_offcanvas(offcanvas_id) {
  darken_screen(true);
  document.getElementById(offcanvas_id).classList.add("show");
  document.body.classList.add("offcanvas-active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-trigger]").forEach(function (everyelement) {
    let offcanvas_id = everyelement.getAttribute("data-trigger");

    everyelement.addEventListener("click", function (e) {
      e.preventDefault();
      show_offcanvas(offcanvas_id);
    });
  });

  document.querySelectorAll(".btn-close").forEach(function (everybutton) {
    everybutton.addEventListener("click", function (e) {
      e.preventDefault();
      close_offcanvas();
    });
  });

  document
    .querySelector(".screen-darken")
    .addEventListener("click", function (event) {
      close_offcanvas();
    });
});

$("nav.main-menu ul li a").click(function () {
  $("body.offcanvas-active").removeClass("offcanvas-active");
  $(".screen-darken.active").removeClass("active");
  $(".fixed-top.show").removeClass("show");
});

// DOMContentLoaded  end

///// Header Fix on Scroll /////

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.getElementById("navbar_main").classList.add("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("navbar_main").classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.getElementById("navbar_main_mobile").classList.add("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document
        .getElementById("navbar_main_mobile")
        .classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});

///// Smooth Scroll Page

jQuery(document).ready(
  (function ($) {
    function scrollToSection(event) {
      event.preventDefault();
      var $section = $($(this).attr("href"));
      $("html, body").animate(
        {
          scrollTop: $section.offset().top,
        },
        500
      );
    }
    $("[data-scroll]").on("click", scrollToSection);
  })(jQuery)
);

///////////// Back to Top /////////////
var btn = $("#GoBack");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});

////////////// Select2 Dropdown /////////////

$(".my-dropdown").select2();
$(".my-dropdown").change(function () {
  $(".my-dropdown").select2();
});

///// Gallery Images Slider

lightGallery(document.getElementById("lightgallery"));

///////////// AOS Animation ///////////

AOS.init({
  duration: 1200,
});

///////// Gallery Images Load More //////////

$(document).ready(function () {
  $(".gallery-content").slice(8).hide();
  $(".gallery-content").slice(0, 8).show();
  $("#loadMore").on("click", function (e) {
    e.preventDefault();
    $(".gallery-content:hidden").slice(0, 8).slideDown();
    if ($(".gallery-content:hidden").length == 0) {
      $("#loadMore").text("No More Images").addClass("noContent");
    }
  });
});

//////////// Date Range Picker ///////////////

$("#event_start_date").daterangepicker({
  singleDatePicker: true,
  startDate: moment().subtract(6, "days"),
});

$("#event_end_date").daterangepicker({
  singleDatePicker: true,
  startDate: moment(),
});
