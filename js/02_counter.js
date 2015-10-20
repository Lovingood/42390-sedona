// Counter
(function () {
  var elements = document.querySelectorAll('.counter');

  if elements {
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
          value = 1;
        }

        if (operation) {
          input.value = value + 1;
        } else {
          if (input.value > 1) {
            input.value = value - 1;
          }
        }
      }
    }
  }
})()
