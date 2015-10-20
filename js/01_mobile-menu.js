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
})()
