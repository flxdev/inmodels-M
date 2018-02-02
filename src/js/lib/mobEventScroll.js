export default function mobEventScroll() {
  $(document).ready(function() {

    
    if( $('.navigation-burger').offset().top > 60 ) {
      $('.navigation-burger').addClass('scrolling');
    }
  	window.onscroll = function() {
      let burger_scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(burger_scrolled > 60 ) {
        $('.navigation-burger').addClass('scrolling');
      } else {
        $('.navigation-burger').removeClass('scrolling');
      }
    };

  });
  
}
