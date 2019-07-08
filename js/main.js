$(document).ready(function () {
  var $navMain = $(this).find('.main-nav__wrapper');
  var $navToggle = $(this).find('.main-nav__toggle');
  var $mainList = $(this).find(".site__list");

  $navMain.removeClass('main-nav--nojs');

  $navToggle.click(function(){
    $(this).toggleClass('change').css('color');
    $mainList.toggle('slow');
  })

  //SLIDE
  $('.fade').slick({
    dots: true,
    arrows: false,
    fade: true,
    speed: 500,
    cssEase: 'linear'
  });

  $('.responsive').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 2, //сколько слайдов показывать в карусели
    slidesToScroll: 2, // сколько слайдов прокручивать за раз
    arrows: true,
    nextArrow: '<img src="img/icon/arrow-right.png">',
    prevArrow: '<img src="img/icon/arrow-left.png">',
    adaptiveHeight: false,
    responsive: [
    {
      breakpoint: 766,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }
  ]
  });

  $('.slick').slick({
    infinite: false,
    arrows: true,
    nextArrow: '<img src="img/icon/arrow-right.png">',
    prevArrow: '<img src="img/icon/arrow-left.png">',
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1169,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  //MODAL


    var $modalCall = $(".modal-callback");
    var $modalOver = $(".modal-overlay");
    var $btnCall = $(".js-popup-callback");
    var $btnClose = $(".modal-close");
    var $name = $(".user-name");

    $btnCall.click(function(event) {
      event.preventDefault();
      $modalCall.css('display', 'inline-block');
      $modalOver.css('display', 'block');
      //$name.focus();
    })
    $btnClose.click(function(event) {
      event.preventDefault();
      $modalCall.css('display', 'none');
      $modalOver.css('display', 'none');
    })

    var $modal = $(".modal");
    var $modalOver = $(".modal-overlay");
    var $btn = $(".js-popup-btn");
    var $btnClose = $(".modal-close");
    var $name = $(".user-name");

    $btn.click(function(event) {
      event.preventDefault();
      $modal.css('display', 'inline-block');
      $modalOver.css('display', 'block');
      //$name.focus();
    })
    $btnClose.click(function(event) {
      event.preventDefault();
      $modal.css('display', 'none');
      $modalOver.css('display', 'none');
    })


  //VALIDATE
  $(function(){
    var regex = {
      Name: /^[a-zа-я]+[\s\-a-zа-я]+?$/i,
      Phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
      Email: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    };

    $(".phone").mask("+7(999)999-9999");

    $.fn.setCursorPosition = function(pos) {
      if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
      } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    $(".phone").click(function(){
      $(this).setCursorPosition(3);  // set position number
    });

    $.each($('.form-block p input'), function(){
      $(this).on('focusout', function(){
        if(!regex[$(this).attr('name')].test($(this).val())){
          $(this).addClass('error');
          $( "button" ).click(function( event ) {
            event.preventDefault();
          })
        } else{
          $(this).removeClass('error');
        }
      });
    });
  });

  //link + scroll
  $(function(){
    $('a[data-target^="anchor"]').bind('click.smoothscroll', function(){
      console.log('test');
      var target = $(this).attr("href"),
          bl_top = $(target).offset().top;
      $('body, html').animate({scrollTop: bl_top}, 700);
      return false;
    });
  });

  //E-mail Ajax Send
  $("form").submit(function() { //Change
    var th = $(this);
    var $modal = $(".modal-result");
    var $area = $(".modal-overlay");
    var $btnClose = $(".modal-close");
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $modal.css('display', 'block');
      $area.css('display', 'block');
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
      $btnClose.click(function(event) {
        event.preventDefault();
        $modal.css('display', 'none');
      })
    });
    return false;
  });
});
