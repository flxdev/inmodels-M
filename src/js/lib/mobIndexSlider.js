import Swiper from 'swiper';

export default function initIndexSlider() {

  let indexSlider = $('.index-slider');
  if(indexSlider.length) {
  	console.log(' index swiper ranger ');
    let index_slider = new Swiper (indexSlider, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
      },
    });
  }

}
