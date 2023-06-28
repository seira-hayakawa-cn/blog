$(function() {
  if ($('#go-top-button-container').is(':visible')) {
    $('#go-top-button-inner').hide();
  } else {
    let currentTop = $(this).scrollTop();
    if (currentTop > 56) {
      $('#go-top-button-inner').fadeIn('slow');
    }
  }

  $(window).on('scroll', throttle(function(event) {
    let currentTop = $(this).scrollTop();
    if ($(document).height() - currentTop - $(window).height() <= 100)  {
      $('#go-top-button-inner').fadeOut('slow');
    } else if (currentTop > 56) {
      $('#go-top-button-inner').fadeIn('slow');
    } else {
      $('#go-top-button-inner').fadeOut('slow');
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