// ナビゲーションバー
// $("document").ready(function() {
//   handleShowHideSidebar();
//   handleEscKey();
//   handleSideBarClick();
// });
//
// function handleShowHideSidebar() {
//   var $menuButton = $("#menu-button i"),
//       show = "animated slideInLeft",
//       hide = "animated slideOutLeft";
//
//   $menuButton.on("click", function() {
//     var $sideBar = $("#sidebar");
//
//     if ($sideBar.hasClass("slideInLeft")) {
//       $sideBar
//         .removeClass(show)
//         .addClass(hide)
//         .removeClass("hidden");
//     } else {
//       $sideBar
//         .removeClass(hide)
//         .addClass(show)
//         .removeClass("hidden");
//     }
//   });
// }
//
// function handleSideBarClick() {
//   $("#sidebar li a").on("click", function() {
//     var href = $(this).attr("href");
//     $("html, body").animate({
//       scrollTop: $(href).offset().top
//     }, 600);
//     $("#sidebar")
//       .removeClass("animated slideInLeft")
//       .addClass("animated slideOutLeft");
//     return false;
//   });
// }
//
// function handleEscKey() {
//   $(document).on("keyup", function(e) {
//     if (e.keyCode === 27) {
//       var href = $(this).attr("href");
//       $("html, body").animate({
//         scrollTop: $(href).offset().top
//       }, 600);
//       $("#sidebar")
//         .removeClass("animated slideInLeft")
//         .addClass("animated slideOutLeft");
//       return false;
//     }
//   });
// }

// タイピングカーソル
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 220 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
