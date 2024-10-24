/* start float action buuton */
document.querySelector('.fab').addEventListener('click',function(e){
  document.querySelector('.box').classList.toggle('box-active');
  document.querySelector('.fab').classList.toggle('fab-active');
  });
/* end float action buuton */

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  
  var windowOn = $(window);
  
  windowOn.on('load', function () {
    $("#loading").delay(500).fadeOut("slow");
  });
  
  
  windowOn.scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
    }
  });
//slider
windowOn.scroll(function () {
  if ($(this).scrollTop() > 300) {
    $('.logo').removeClass('logo_2').css('top', '0px');
  } else {
    $('.logo').addClass('logo_2').css('top', '-100px');
  }
});


$(document).ready(function () {
    $('.one-time').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      rtl: true,
    autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      prevArrow: false,
      nextArrow: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1008,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    })
  });
  $(document).ready(function () {
    $('.autoplay').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      rtl: true,
      autoplay: true,
      autoplaySpeed: 2000,
       prevArrow: '<button class="slick-prev prev-arrow"><i class="fa-solid fa-angle-right"></i></button>',
      nextArrow: '<button class="slick-next next-arrow"><i class="fa-solid fa-angle-left"></i></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1008,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
  });
  

  




function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password-input");
  var toggleIcon = document.querySelector(".toggle-password");
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.style.backgroundImage = '<i class="fa-light fa-eye"></i>'; /* Replace with your open eye icon image */
  } else {
    passwordInput.type = "password";
    toggleIcon.style.backgroundImage = '<i class="fa-sharp fa-regular fa-eye-slash"></i>'; /* Replace with your eye icon image */
  }
}
function togglePasswordVisibility_2() {
  var passwordInput = document.getElementById("password-input_2");
  var toggleIcon = document.querySelector(".toggle-password");
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.style.backgroundImage = '<i class="fa-light fa-eye"></i>'; /* Replace with your open eye icon image */
  } else {
    passwordInput.type = "password";
    toggleIcon.style.backgroundImage = '<i class="fa-sharp fa-regular fa-eye-slash"></i>'; /* Replace with your eye icon image */
  }
}


