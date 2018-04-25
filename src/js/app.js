import $ from 'jquery/dist/jquery';
import Barba from 'barba.js/dist/barba.min';
import './lib/domConf';
import setInputFocus from './lib/inputFocus';
// import initDropzone from './lib/initDropzone';
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
    $('.modal-layout').removeClass('active');
    setTimeout(function() {
      window.DOM.showScroll();
    },5);
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
    // Barba.Prefetch.init();

    /* 
      ** проверяем урл (внешний переход или битрикс. или внутренний)
      ** если внутренний - проверка на переход по ссылке .business-request для доскролла страницы. 
      ** если переход с нужной ссылки - присваиваем let business = true.
      ** если с иной - переназначаем false.
    */
    let business = false;
    // let social = false;
    Barba.Dispatcher.on('linkClicked', function(elem) {
      /* 
        ** убираем класс, скрывающий бургер
      */
      $('.navigation-burger').removeClass('block-click');
      
      let _t = $(elem);
      if(_t.attr('href').indexOf('/bitrix/admin/') !== -1 || _t.hasClass('no-barba')) {
        window.location.href = window.location.protocol + '//' + window.location.host+_t.attr('href');
      } else {
        if(_t.hasClass('business-request')) {
          business = true;
        } else {
          business = false;
        }
        // if(_t.hasClass('social-list')) {
        //   social = true;
        // } else {
        //   social = false;
        // }
      }
      
    });

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
        /* 
          ** если проверка .business-request true, то доскроливаем
        */
        if(business) {
          setTimeout(() => {
            let to_scroll = $('#contacts-form'),
              how_scroll = $(to_scroll).offset().top-30;
            $('html, body').animate({scrollTop: how_scroll}, 600);
          }, 1000);
            
        }
        // if(social) {
        //   setTimeout(() => {
        //     let to_scroll = $('.contacts-wrap'),
        //       how_scroll = $(to_scroll).offset().top-30;
        //     $('html, body').animate({scrollTop: how_scroll}, 600);
        //   }, 1000);
            
        // }
        
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
        if(window.DOM.menu.hasClass('active')) {
          tl
            .set(window.DOM.menu, {
              className: '+=hide-anim'
            });
          tl
            .set(window.DOM.pageLoader, {
              delay: this.delay,
              className: '+=page-load'
            })
            .to(window.DOM.pageLoaderW, 0.5, {
              scaleY: 1,
            })
            .set(window.DOM.menu, {
              className: '-=hide-anim'
            })
            .to(window.DOM.pageLoaderB, 0.6, {
              scaleY: 1,
            });
          window.DOM.showScroll();
           
        } else {
          tl
            .set(window.DOM.pageLoader, {
              delay: this.delay,
              className: '+=page-load'
            })
          // .to(window.DOM.pageLoaderW, 0.5, {
          //   scaleY: 1,
          // })
            .set(window.DOM.menu, {
              className: '-=hide-anim'
            })
            .to(window.DOM.pageLoaderB, 0.6, {
              scaleY: 1,
            });
        }

        return deferred.promise;
      },

      fadeIn: function() {
        const _this = this;
        let newCont = $(this.newContainer);
        let oldCont = $(this.oldContainer);
        let blockContent = newCont.find('.block-load');
        window.scroll(0, 0);
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
                  y: 50,
                  autoAlpha: 0,
                })
                .to(window.DOM.pageLoaderW, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  
                })
                .to(window.DOM.pageLoaderB, 0.4, {
                  scaleY: 0,
                  transformOrigin:'top center',
                  // clearProps:'all'
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
    $('.inner-wrap').addClass('active');
    window.DOM.navBurger.addClass('hide-nav-burger');
    if(window.location.href.indexOf('/ru/') > 1) {
      window.DOM.navBack.addClass('view-nav-back').attr('href', '/ru/gallery/');
    } else{
      window.DOM.navBack.addClass('view-nav-back').attr('href', '/gallery/');
    }
    
  },
  onLeave: function() {
    setTimeout(function() {
      window.DOM.navBurger.removeClass('hide-nav-burger');
      window.DOM.navBack.removeClass('view-nav-back');
    }, 500);
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
    // initDropzone();
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
    $('.inner-wrap').addClass('active');
    window.DOM.navBurger.addClass('hide-nav-burger');
    if(window.location.href.indexOf('/ru/') > 1) {
      window.DOM.navBack.addClass('view-nav-back').attr('href', '/ru/models/');
    } else {
      window.DOM.navBack.addClass('view-nav-back').attr('href', '/models/');
    }
    
  },
  onLeave: function() {
    setTimeout(function() {
      window.DOM.navBurger.removeClass('hide-nav-burger');
      window.DOM.navBack.removeClass('view-nav-back');
    }, 500);
  },
  onLeaveComplete: function() {
  }
});


var error = Barba.BaseView.extend({
  namespace: 'error',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    scrollAnimations();
    mobEventScroll();
    let v = $('.social-wrap');
    if(v.length) {
      window.DOM.body.addClass('social-fix');
    }

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

});
window.onload = () => {
  scrollAnimations();
  window.DOM.body.removeClass('loading');
};
