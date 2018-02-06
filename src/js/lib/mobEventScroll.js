export default function mobEventScroll() {

  let burg_elem = $('.navigation-burger');
  
  if (burg_elem.length) {
    window.onscroll = function() {
      let burger_scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if(burger_scrolled > 60 ) {
        burg_elem.addClass('scrolling');
      } else {
        burg_elem.removeClass('scrolling');
      }
    };

  }
    
}
