import './domConf';
export default function initPopUp() {
  var _this = $(this);
  _this.b = {
    open: $('.js-popup-button'),
  };
  _this.c = {
    popup: $('.js-popup-container'),
  };
  _this.f = {};
  _this.conf = {
    isAnimate: false,
    active_class: 'active',
    close_selector: $('.closePopup'),
    link_selector: '.modal-link',
    initial_class: 'popup-initialed',
    header_class: 'is-hidden'
  };

  // _this.f.initModalActions = function(_popup) {
  //   /**
  //    * Close buttons.
  //    */
  //   $(_popup).on('click touchstart ', '.modal-container', function(e) {
  //     if(!_this.conf.isAnimate) {
        
  //       if ( $(_this.conf.close_selector).is(e.target) || $(_this.conf.link_selector).is(e.target) ) {
  //       } else {
  //         e.stopPropagation();
  //       }
  //     }
  //   });   
  // };

  _this.f.closePopup = function(_popup) {
    _this.conf.isAnimate = true;
    setTimeout(function() {
      window.DOM.showScroll();
    },5);
    _popup.removeClass(_this.conf.active_class);
    _this.conf.isAnimate = false;
  };

  _this.f.openPopup = function(_popup) {
    _this.conf.isAnimate = true;
    _popup.addClass(_this.conf.active_class).promise().done(() => {
      setTimeout(function() {
        window.DOM.hideScroll();
        _this.conf.isAnimate = false;
      },200); 
    });
  };
  /**
   * Initial.
   */
  // $.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
  //   var _popup = $(this);
  //   _this.f.initModalActions(_popup);
  //   console.log('1');
  //   _popup.off('reinit').on('reinit', function() {
  //     _this.f.initModalActions(_popup);
  //     console.log('2');
  //   });
  //   _popup.addClass(_this.conf.initial_class);
  //   console.log('3');
  // });
  
  _this.conf.close_selector.off('click').on('click touchstart ', function() {
    var _popup = $(this).parents(_this.c.popup);
    _this.f.closePopup(_popup);
  });

  _this.b.open.off('click touchstart').on('click touchstart', function(e) {
    e.preventDefault();
    if(!_this.conf.isAnimate) {
      var _b = $(this),
        _popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
      _this.f.openPopup(_popup);
      return false;
    }

  });
}
