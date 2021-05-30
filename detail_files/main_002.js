var serviceSwiper = new Swiper('.service-page__gallery-slider .swiper-container', {
      navigation: {
        nextEl: '.service-page__gallery .plate.square .nav-service a.right',
        prevEl: '.service-page__gallery .plate.square .nav-service a.left',
      },
      slidesPerView: 4,
      spaceBetween: 1,
      loop: true,
});
var directionSwiper = new Swiper('.new-video-slider .video-slider .swiper-container', {
      navigation: {
        nextEl: '.new-video-slider .wrapper .navbar .right',
        prevEl: '.new-video-slider .wrapper .navbar .left',
      },
      slidesPerView: 1,
      loop: true,
      preventClicks: true
});

(function(){
  $('.service-page__plan .wrapper .row:not(.title) .col.second .anim-wrap').each(function(index, el) {
  	$(this).parent().parent().find('.col.fourth .anim-wrap').css('max-height',  $(this).outerHeight());
  });
  $('body').on('click', '.service-page__plan .wrapper .row .col.fourth .openup', function(event) {
  	$(this).toggleClass('openup_active');
  	$(this).parent().find('.anim-wrap').toggleClass('anim-wrap_full');
  	if ($(this).hasClass('openup_active')) {
  		$(this).empty().html('закрыть');
  	} else {
  		$(this).empty().html('раскрыть');
  	}
  });
})();