// Close Modals
(function() {
  var close_btn = document.querySelector('.modal__button--close');
  var ok_btn = document.querySelector('.modal__button--ok');

  if (close_btn) {
    close_btn.addEventListener("click", function() {
      event.preventDefault();
      document.querySelector(".modal--success").classList.remove("modal--opened");
    })
  };

  if (ok_btn) {
    ok_btn.addEventListener("click", function() {
      event.preventDefault();
      document.querySelector(".modal--failure").classList.remove("modal--opened");
    })
  };
})()
