import Swiper from 'swiper';

export default function initAboutSliders() {

  let aboutSlider = $('.about-slider');
  if(aboutSlider.length) {
    let about_slider = new Swiper (aboutSlider, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: 'true'
      },
      breakpoints: {
        550: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }
    });
  }
}
