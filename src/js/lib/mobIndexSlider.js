import Swiper from 'swiper/dist/js/swiper.min.js';

export default function initIndexSlider() {

  let indexSlider = $('.index-slider');
  if(indexSlider.length) {
    let index_slider = new Swiper (indexSlider, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });
  }

}
