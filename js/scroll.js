$(function() {
  let currentTop = $(this).scrollTop();
  if (currentTop > 60) {
    $('#go-top-button-inner').fadeIn();
  }
  let initTop = 0;
  $(window).on('scroll', throttle(function(event) {
    let currentTop = $(this).scrollTop();
    if ($(document).height() - currentTop - $(window).height() <= 100)  {
      $('#go-top-button-inner').fadeOut();
    } else if (currentTop > 60) {
      $('#go-top-button-inner').fadeIn();
      if (currentTop > initTop) {
        if ($('#navbar').is(':visible')) {
          $('#navbar').fadeOut();
        }
      } else {
        if (!$('#navbar').is(':visible')) {
          $('#navbar').fadeIn();
        }
      }
    } else {
      if (currentTop === 0) {
        $('#navbar').fadeIn();
      }
    }
    initTop = currentTop;
  }, 50, 100));

  $('#go-top-button-inner').on('click', function(){
    $('body , html').animate({
      scrollTop: 0
    },
    500);
  });
});