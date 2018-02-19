import validator from 'jquery-form-validator/form-validator/jquery.form-validator.min.js';
// import autosize from 'autosize';

export default function setInputFocus() {
  
  let inputs = $('.input-item');
  if(inputs.length) {
    inputs.each(function() {
      let _t = $(this);
      _t.on('click', function() {
        if(!_t.hasClass('focus')) {
          $(this).addClass('focus');
          $(this).find('input').focus();
        } else {
          if(_t.hasClass('select')) {
            _t.removeClass('focus');
          }
        }
      });
      $(document).on('click touchstart', function(e) {
        if (!_t.is(e.target) && _t.has(e.target).length === 0) {
          _t.removeClass('focus').blur();
        }
      }); 
    });
  }

  
  let _input_f = $('.input-field');
  if(_input_f.length) {
    _input_f.each(function() {
      $(this).on('input change',function() {
        let _val = $(this).val().length,
          parent = $(this).parent();
        if(_val<=0) {
          parent.removeClass('editing');
        } else {
          parent.addClass('editing');
        }
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

  // autosize($('textarea'));

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

  $('button[type="submit"]').on('click touchstart', function() {
    let error_l;
    setTimeout(function() {
      let error_l = $('.error').length;
      if(!error_l) {
        $('form').fadeOut(400);
        $('.block-success').delay(450).fadeIn(400);
      }
    }, 100);
  });

  $('.js-to-form').on('click touchstart', function(e) {
    e.preventDefault();
    let _t = $(this),
      to_scroll = _t.attr('href'),
      how_scroll = $(to_scroll).offset().top-60;

    $('html, body').animate({scrollTop: how_scroll}, 600);
  });

}
