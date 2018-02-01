
import setInputFocus from './lib/inputFocus';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import initPopUp from './lib/initPopUp';
import youtubeVideo from './lib/youtubeVideo';
import initGallery from './lib/initGallery';
import initModels from './lib/initModels';
import initAboutSliders from './lib/initSliders';
import scrollAnimations from './lib/scrollAnimations';
import initInnerSlider from './lib/initInnerSlider';
import initIndexSlider from './lib/mobIndexSlider';

$(document).ready(function() {
  // alert('qq');
  initPopUp();
  initIndexSlider();
  scrollAnimations();
  formValidator();
  initDropzone();
  setInputFocus();
  initAboutSliders();
  initGallery();
  initModels();

  let burger = $('.navigation-burger'); 
  window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if(scrolled > 60 ) {
      burger.addClass('scrolling');
    } else {
      burger.removeClass('scrolling');
    }
  };
});
