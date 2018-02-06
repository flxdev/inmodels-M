import $ from 'jquery/dist/jquery';
import Barba from 'barba.js/dist/barba.min';
import './lib/domConf';
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
import mobEventScroll from './lib/mobEventScroll';
import { TimelineMax, Sine} from 'gsap';

var cbk = function(e) {
  if(e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};
function preventDbClick() {
  var links = document.querySelectorAll('a[href]');

  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }
}
var BarbaWitget = {
  init: function() {  
    var scope = this;
    window.DOM.getScrollWidth();
    preventDbClick();
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on('newPageReady', function(currentStatus) {
      var link = currentStatus.url.split(window.location.origin)[1].substring(0);
      var navigationLinks = document.querySelectorAll('.js-nav');
      var navigationLinkIsActive = document.querySelectorAll('[href="' + link + '"]');

      Array.prototype.forEach.call(navigationLinks, function(navigationLink) {
        return navigationLink.classList.remove('active');
      });
      Array.prototype.forEach.call(navigationLinkIsActive, function(navigationLink) {
        return navigationLink.classList.add('active');
      });
      preventDbClick();

    }); 
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, oldStatus, container) => {
      setTimeout(() => {
        scrollAnimations();
      },300);
    }); 
    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },

      fadeOut: function() {
        var deferred = Barba.Utils.deferred();
        let tl = new TimelineMax({
          onComplete: () => {
            window.DOM.menuClose.trigger('click');
            deferred.resolve();
          }
        });
        // if(window.DOM.menu.hasClass('active')) {
        //   tl.set(window.DOM.menu, {
        //     className: '+=hide-anim'
        //   });
        //   this.delay = 1;
        // } else {
        //   this.delay = 0;
        // }

        tl
          .set(window.DOM.pageLoader, {
            delay: this.delay,
            className: '+=page-load'
          })
          .to(window.DOM.pageLoaderW, 0.4, {
            scaleY: 1,
          })
          .set(window.DOM.menu, {
            className: '-=hide-anim'
          })
          .to(window.DOM.pageLoaderB, 0.4, {
            scaleY: 1,
          });
        return deferred.promise;
      },

      fadeIn: function() {
        const _this = this;
        let newCont = $(this.newContainer);
        let oldCont = $(this.oldContainer);
        let blockContent = newCont.find('.block-content');
        window.scroll(0, 0);
        window.DOM.hideScroll();
        let tlIn = new TimelineMax();
        tlIn
          .set(oldCont,{
            display: 'none'
          })
          .set(newCont, {
            autoAlpha: 1,
            onComplete: () => {
              _this.done();
              
              tlIn
                .set(blockContent, {
                  y: 150,
                  autoAlpha: 0,
                })
                .to(window.DOM.pageLoaderB, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  // clearProps:'all'
                })
                .to(window.DOM.pageLoaderW, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  
                })
                .to(blockContent, 0.5, {
                  y: 0,
                  autoAlpha: 1,
                  clearProps:'all',
                  onComplete: () => {

                    tlIn
                      .set(window.DOM.pageLoaderB, {
                        clearProps:'all'
                      })
                      .set(window.DOM.pageLoaderW, {
                        clearProps:'all'
                      })
                      .set(window.DOM.pageLoader, {
                        className: '-=page-load'
                      });
                    window.DOM.showScroll();
                  }
                });

            }
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
  },
  onEnterCompleted: function() {
    initIndexSlider();
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});

var about = Barba.BaseView.extend({
  namespace: 'about',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    initAboutSliders();
    scrollAnimations();
    mobEventScroll();
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});


var gallery = Barba.BaseView.extend({
  namespace: 'gallery',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    initGallery();
    mobEventScroll();
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});

var galleryNews = Barba.BaseView.extend({
  namespace: 'gallery-news',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    youtubeVideo();
    scrollAnimations();
    mobEventScroll();
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});

var models = Barba.BaseView.extend({
  namespace: 'models',
  onEnter: function() {
    
  },
  onEnterCompleted: function() {
    window.DOM.navSearch.addClass('active');
    
    initModels();
    setInputFocus();
    
    
  },
  onLeave: function() {
    window.DOM.navSearch.removeClass('active');
  },
  onLeaveComplete: function() {
  }
});

var contacts = Barba.BaseView.extend({
  namespace: 'contacts',
  onEnter: function() {

  },
  onEnterCompleted: function() {
    formValidator();
    initDropzone();
    setInputFocus();
    scrollAnimations();
    mobEventScroll();
  },
  onLeaveComplete: function() {
  }
});

var innerModel = Barba.BaseView.extend({
  namespace: 'inner-model',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    initInnerSlider();
    youtubeVideo();
    mobEventScroll();
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});


var error = Barba.BaseView.extend({
  namespace: 'error',
  onEnter: function() {
  },
  onEnterCompleted: function() {
  },
  onLeave: function() {
  },
  onLeaveComplete: function() {
  }
});
$(document).ready(function() {
  index.init();
  about.init();
  gallery.init();
  galleryNews.init();
  models.init();
  contacts.init();
  innerModel.init();
  error.init();
  initPopUp();

  BarbaWitget.init();

  window.onload = () => {
    scrollAnimations();
    
  };
});
