// Amount travelers
(function() {
  var persons = document.querySelector(".form-review__input-group--persons");
  if (document.querySelector("#person-row")) {
    var person = document.querySelector("#person-row").innerHTML;
  }

  var amount = document.querySelector("#amount");
  if (amount) {
    var count = Number(amount.value);
  }

  var amountblock = document.querySelector('.counter--amount');
  if (amountblock) {
    var minus = amountblock.querySelector('.counter__button--minus');
    var plus = amountblock.querySelector('.counter__button--plus');
  }

  if (minus) {
    minus.addEventListener('click', function() {
      event.preventDefault();
      var count = Number(amount.value);
      deleteRow(count);
    });
  }

  if (plus) {
    plus.addEventListener('click', function() {
      event.preventDefault();
      var count = Number(amount.value);
      makeRow(count);
    });
  }

  function makeRow(count) {
    for (var i = 1; i <= count; i++) {
      var id = "number-" + i;
      var row = document.createElement("div");
      row.classList.add("row");
      row.classList.add("person-row");
      row.id = id;
      var html = Mustache.render(person, {
        "number": i
      });

      row.innerHTML = html;
    }
    persons.appendChild(row);
  }

  function deleteRow(count) {
    var id = "number-" + (count + 1);
    element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }
})()
