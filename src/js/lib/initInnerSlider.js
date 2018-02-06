import Swiper from 'swiper/dist/js/swiper';
import lightGallery from 'lightGallery/dist/js/lightgallery.min.js';
import debounce from './debounce';

// export default function initInnerSlider() {

//   let in_slider = $('.inner-slider');
//   if (in_slider.length) {

//   	var slide_link = [];

//   	$('.inner-slider .swiper-slide').each(function(i) {
//       slide_link.push($(this).data('link'));
//     });

//   	var swiper = new Swiper(in_slider, {
//       slidesPerView: 'auto',
//       spaceBetween: 20,
//       freeMode: true,
//       freeModeMomentumBounce: true,
//       scrollbar: {
//         el: '.inner-slider-bar',
//         hide: false,
//       },
//     });

//     swiper.on('transitionEnd', function() {
//       let trigger = $('.inner-slider .swiper-slide-active').data('link');
//       $('.' + trigger).addClass('active').siblings().removeClass('active');
//     });

//     // $('.slide-target').on('click', function(e) {
//     // 	e.preventDefault();
//     // 	swiper.slideTo(0);
//     // 	// let bttn_class = $(this).data('slide');
//     // 	// $('.swiper-pagination-bullet.' + bttn_class)[0].click();
//     // });

//     in_slider.lightGallery({
// 	    selector: '.item',
// 	    mode: 'lg-slide',
// 	    cssEasing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
// 	    loop: false,
// 	    hideControlOnEnd: true,
// 	    mousewheel: true,
// 	    download: false,
// 	    speed: 800
//     });
//   }
  
//   let innerInfo = $('.inner-info');
//   if(innerInfo.length) {
//     var inner_info = new Swiper (innerInfo, {
//       direction: 'horizontal',
//       loop: false,
//       slidesPerView: 'auto',
//       spaceBetween: 40,
//       freeMode: true,
//       scrollbar: {
//         el: '.inner-info-bar',
//         hide: false,
//       },
//     });
//   }
// }


export default function initInnerSlider() {

  let in_slider = $('.inner-slider');
  if (in_slider.length) {

    const pagiTriggers = $('.swiper-navigation').find('.slide-target');
    const slides = $('.swiper-slide');
    const slidesLength = slides.length;

    var swiper = new Swiper(in_slider, {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween: 20,
      freeMode: true,
      freeModeMomentumBounce: false,
      pagination: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // slidesOffsetAfter: 500,
      on: {
        init: function() {
          pagiTriggers.first().addClass('active');
        },
      },
      // mousewheel: {
      //   sensitivity: 1.2,
      //   eventsTarged: '.block-inner'
      // },
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
      },
    });

    swiper.on('progress',debounce(() => {
      let active = $('.swiper-slide-visible').last();
      // let active = active.removeClass('swiper-slide-visible');
      // console.log(active);;
      let trigger = active.data('link');
      let triggerIndex = active.index() + 1;
      pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
      //   if(triggerIndex + 1 === slidesLength) {
      //     pagiTriggers.removeClass('active').last().addClass('active');
      //   }
    }));
    // .on('reachEnd',() => {
    //   // setTimeout(() => {
    //   let trigger = $('.swiper-slide').last().data('link');
    //   pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
    //   // },5);
    //   return false;
    // })
    // .on('reachBeginning',() => {
    //   // setTimeout(() => {
    //   let trigger = $('.swiper-slide').first().data('link');
    //   pagiTriggers.removeClass('active').filter(`[data-slide="${trigger}"]`).addClass('active');
    //   // },5);

    // });

    pagiTriggers.each(function() {
      let _ = $(this);
      _.on('click',() => {
        let target = _.data('slide');
        let realInd = swiper.realIndex;
        let neededItems = slides.filter(`[data-link="${target}"]`);
        let neededItemsIndex = neededItems.first().index();
        setTimeout(() => {
          swiper.slideTo(neededItemsIndex);    
        },20);

      });
    });

    in_slider.lightGallery({
      selector: '.item',
      mode: 'lg-slide',
      cssEasing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      loop: false,
      hideControlOnEnd: true,
      mousewheel: true,
      download: false,
      speed: 800
    });
  }

  let innerInfo = $('.inner-info');
  if(innerInfo.length) {
    var inner_info = new Swiper (innerInfo, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 'auto',
      spaceBetween: 40,
      freeMode: true,
      scrollbar: {
        el: '.inner-info-bar',
        hide: false,
      },
    });
  }
  
}
