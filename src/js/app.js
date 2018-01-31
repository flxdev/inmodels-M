import $ from 'jquery';
import Barba from 'barba.js';
import setInputFocus from './lib/inputFocus';
import initDropzone from './lib/initDropzone';
import formValidator from './lib/formValidator';
import showVideo from './lib/homeVideo';
import initPopUp from './lib/initPopUp';
import stickInit from './lib/stickInit';
import youtubeVideo from './lib/youtubeVideo';
import initGallery from './lib/initGallery';
import initModels from './lib/initModels';
import initAboutSliders from './lib/initSliders';
import initRellaxParalax from './lib/initRellaxParalax';
import scrollAnimations from './lib/scrollAnimations';
import initInnerSlider from './lib/initInnerSlider';
import initIndexSlider from './lib/mobIndexSlider';

initPopUp();
// setInputFocus();
// formValidator();
// initDropzone();
// showVideo();
// stickInit();
// youtubeVideo();
// initGallery();
// initModels();
// initAboutSliders();
// initRellaxParalax();


var BarbaWitget = {
  init: function() {  
  	var scope = this;
    Barba.Pjax.start();
    Barba.Prefetch.init();
    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
        return $(this.oldContainer).animate({ opacity: 0 }).promise();
      },

      fadeIn: function() {

        var _this = this;
        var $el = $(this.newContainer);
        $(this.oldContainer).hide();
        $el.css({
          visibility : 'visible',
          opacity : 0
        });

        $el.animate({ opacity: 1 }, 400, function() {
          _this.done();
        });

      }
    });
  
    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };    
  }
};

var index = Barba.BaseView.extend({
  namespace: 'index',
  onEnter: function() {
  	// $('.navigation-lang').addClass('visible-lang');
  },
  onEnterCompleted: function() {
  	showVideo();
    initIndexSlider();
  },
  onLeave: function() {
  	// $('.navigation-lang').removeClass('visible-lang');
  },
  onLeaveComplete: function() {
  }
});

var about = Barba.BaseView.extend({
  namespace: 'about',
  onEnter: function() {
  },
  onEnterCompleted: function() {
  	$('.header-links').addClass('show-header-links');
    initAboutSliders();
    initRellaxParalax();
    scrollAnimations();
  },
  onLeave: function() {
  	$('.header-links').removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});


var gallery = Barba.BaseView.extend({
  namespace: 'gallery',
  onEnter: function() {
  },
  onEnterCompleted: function() {
  	$('.header-links').addClass('show-header-links');
    initGallery();
  },
  onLeave: function() {
  	$('.header-links').removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});

var galleryNews = Barba.BaseView.extend({
  namespace: 'gallery-news',
  onEnter: function() {
  },
  onEnterCompleted: function() {
  	$('.header-links').addClass('show-header-links');
    initRellaxParalax();
    youtubeVideo();
    stickInit();
    scrollAnimations();
  },
  onLeave: function() {
    $('.header-links').removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});

var models = Barba.BaseView.extend({
  namespace: 'models',
  onEnter: function() {
  	
  },
  onEnterCompleted: function() {
  	$('.header-links').addClass('show-header-links');
    $('.navigation-search').addClass('active');
    scrollAnimations();
    initModels();
    // ajaxPagenation();
  },
  onLeave: function() {
    $('.navigation-search').removeClass('active');
    $('.header-links').removeClass('show-header-links');
  },
  onLeaveComplete: function() {
  }
});

var contacts = Barba.BaseView.extend({
  namespace: 'contacts',
  onEnter: function() {

  },
  onEnterCompleted: function() {
    stickInit();
    formValidator();
    initDropzone();
    setInputFocus();
    scrollAnimations();
  },
  onLeaveComplete: function() {
  }
});

var innerModel = Barba.BaseView.extend({
  namespace: 'inner-model',
  onEnter: function() {
  	$('.navigation-logo').addClass('hide-nav-logo');
  },
  onEnterCompleted: function() {
  	initInnerSlider();
  	youtubeVideo();
  },
  onLeave: function() {
  	$('.navigation-logo').removeClass('hide-nav-logo');
  },
  onLeaveComplete: function() {
  }
});


var error = Barba.BaseView.extend({
  namespace: 'error',
  onEnter: function() {
  	$('.navigation-lang').addClass('visible-lang');
  },
  onEnterCompleted: function() {
  },
  onLeave: function() {
  	$('.navigation-lang').removeClass('visible-lang');
  },
  onLeaveComplete: function() {
  }
});

index.init();
about.init();
gallery.init();
galleryNews.init();
models.init();
contacts.init();
innerModel.init();
error.init();

BarbaWitget.init();
