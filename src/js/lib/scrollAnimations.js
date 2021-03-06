import inView from 'in-view/dist/in-view.min.js';

export default function scrollAnimations() {
 
  inView.offset({
    top: 0,
    bottom: 0,
  });
  inView.threshold(0.1);

  let input_item = $('.input-item');
  if(input_item.length) {
    inView('.input-item')
      .on('enter', function(el) {
        if(!el.done) {
          el.classList.add('animate');
        }
      }).on('exit', function(el) {
        el.done = true;
      });
  }
  

  let block_title = $('.form-block__title');
  if(block_title.length) {
    inView('.form-block__title')
      .on('enter', function(el) {
	  if(!el.done) {
	    el.classList.add('animate');
	  }
      }).on('exit', function(el) {
	  el.done = true;
      });
  }
 
  let link_footer = $('.link-footer-inner');
  if(link_footer.length) {
    inView('.link-footer-inner')
      .on('enter', function(el) {
        el.classList.add('animate');
      }).on('exit', function(el) {
        el.classList.remove('animate');
      });
  }

  let g_link_footer = $('.gallery-news-footer');
  if(g_link_footer.length) {
    inView('.gallery-news-footer')
      .on('enter', function(el) {
        el.classList.add('animate');
      }).on('exit', function(el) {
        el.classList.remove('animate');
      });
  }

  let social = $('.social-wrap');
  if(social.length) {
    inView('.social-wrap')
      .on('enter', function(el) {
        if(!el.done) {
          setTimeout(function() {
            el.classList.add('animate');
          }, 50);
        }
      }).on('exit', function(el) {
        el.done = true;
      });
  }

}
