$(function () {

  wow = new WOW(
    {
      boxClass: 'wow',
      animateClass: 'animate__animated --active',
      offset: 300,
      mobile: false,
    }
  )

  wow.init();


  $("#menu").on("click", "a", function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);


});