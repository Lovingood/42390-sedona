// Mobile menu
(function () {
  var hamburger = document.querySelector('.menu-toggle');
  var close = document.querySelector('.main-nav__close');
  var menu = document.querySelector('.main-nav');

  hamburger.addEventListener('click', function() {
    event.preventDefault();
    menu.classList.toggle('main-nav--opened');
  });

  close.addEventListener('click', function() {
    event.preventDefault();
    menu.classList.remove('main-nav--opened');
  })
})();

// Counter
(function () {
  var elements = document.querySelectorAll('.counter');

  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector('input');
    var minus = parent.querySelector('.counter__button--minus');
    var plus = parent.querySelector('.counter__button--plus');

    minus.addEventListener('click', function() {
      event.preventDefault();
      changeNumber(false);
    });

    plus.addEventListener('click', function() {
      event.preventDefault();
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);

      if (isNaN(value)) {
        value = 0;
      }

      if (operation) {
        input.value = value + 1;
      } else {
        if (input.value > 0) {
          input.value = value - 1;  
        }
      }
    }
  }
})();


// Send form by AJAX
(function () {
  if (!("FormData in window")) {
    return;
  }

  var form = document.querySelector('.form-review');
  var data = new FormData(form);

  var url = 'https://echo.htmlacademy.ru/adaptive';

  var xhr = new XMLHttpRequest();

  xhr.open('post', url);

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
    }
  });

  xhr.send(data);
})();