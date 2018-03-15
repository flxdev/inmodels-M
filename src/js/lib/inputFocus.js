import validator from 'jquery-form-validator/form-validator/jquery.form-validator.min.js';
// import 'jquery-form-validator/form-validator/security.js';
import 'jquery-form-validator/src/modules/file.js';
import './domConf';

export default function setInputFocus() {

  var form_valid = $('.js-validate');
  if (form_valid.length) {
    form_valid.each(function() {
      var form_this = $(this);
      $.validate({
        form: form_this,
        validateOnBlur : true,
        validateHiddenInputs : true,
        scrollToTopOnError : false,
        modules: 'file',
        // modules: 'security',
        // reCaptchaSiteKey: '6LfyQ0YUAAAAALnPYQDtOHEU5cBfXMIMC3m5kPXn',
        // reCaptchaSize: 'normal',
        // reCaptchaTheme: 'light',
      });
    });
  }
  
  let drop_input = $('.drop-input');
  if(drop_input.length) {
    drop_input.each(function() {
      $(this).on('input change',function() {
        let _inp =  $(this),
          _inp_parent = _inp.parent().parent(),
          _inp_name = _inp_parent.find('.file-name'),
          _name_wrap = _inp_parent.find('.file-name-wrap'),
          str = _inp.val();
        if (str.lastIndexOf('\\')) {
          var i = str.lastIndexOf('\\')+1;
        }
        else{
          var i = str.lastIndexOf('/')+1;
        }           
        var filename = str.slice(i);
        _inp_name.html(filename);
        _inp.validate();
        _name_wrap.fadeIn(300);
      });
    });
  }

  let clear_file = $('.clear-file');
  if(clear_file.length) {
    clear_file.each(function() {
      let _clear = $(this);
      _clear.on('click touchstart', function() {
        let _clear_parent = $(this).parent().parent(),
          _clear_inp = _clear_parent.find('.drop-input'),
          _clear_name = _clear_parent.find('.file-name'),
          _clear_wrap = _clear_parent.find('.file-name-wrap');
        _clear_wrap.fadeOut(300);
        setTimeout( function() {
          _clear_inp.val('');
          _clear_inp.validate();
          _clear_name.html('');
        }, 350);
        
      });
    });
  }

  let inputs = $('.input-item');
  let nav_burgr = $('.navigation-burger');
  let wHeight = document.documentElement.clientHeight;

  if(inputs.length) {
    inputs.each(function() {
      let _t = $(this);
      _t.on('click', function() {
        console.log(wHeight);
        nav_burgr.addClass('block-click');
        if(!_t.hasClass('focus')) {
          _t.addClass('focus').siblings().removeClass('focus');
        } else {
          if(_t.hasClass('select')) {
            _t.removeClass('focus');
          }
        }
      });
    });
    $(document).on('click touchend', function(e) {
      if (!inputs.is(e.target) && inputs.has(e.target).length === 0) {
        $('.input-item.select').removeClass('focus');
      }
    }); 
  }
  
  let _input_f = $('.input-field');
  if(_input_f.length) {
    _input_f.each(function() {
      let _f = $(this);
      _f.on('input change',function() {
        let _val = _f.val().length,
          parent = _f.parent();
        if(_val<=0) {
          parent.removeClass('editing');
        } else {
          parent.addClass('editing');
          console.log(wHeight);
        }
      });
      _f.on('blur', function() {
        let parent = _f.parent();
        parent.removeClass('focus');
        nav_burgr.removeClass('block-click');
        setTimeout(function() {
          $('html').height(wHeight);
        },300);
        
      });
    });
  }

  let select_item = $('.select-list__item');
  if(select_item.length) {
    select_item.each(function() {
      let _item = $(this);
      _item.on('click touchstart', function(e) {
        e.stopPropagation();
        let value = $(this).text(),
          parent = $(this).closest('.select');
        parent.find('.select-link').text(value);
        parent.find('input').val(value).validate();
        parent.removeClass('focus');
  
      });
    });
  }

  $('textarea').each(function() {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
  }).on('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  $('input[type="tel"]').on('click', function() {
    let i_val =  $(this).val();
    if(!i_val) {
      $(this).val('+');
    }
  });

  $('input[type="tel"]').on('blur', function() {
    let i_val =  $(this).val();
    console.log(i_val);
    if(i_val === '+') {
      $(this).val('');
    }
  });

  $('.js-to-form').on('click touchstart', function(e) {
    e.preventDefault();
    let _t = $(this),
      to_scroll = _t.attr('href'),
      how_scroll = $(to_scroll).offset().top-35;

    $('html, body').animate({scrollTop: how_scroll}, 600);
  });

}
