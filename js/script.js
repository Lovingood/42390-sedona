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

    if (minus) {
      minus.addEventListener('click', function() {
        event.preventDefault();
        changeNumber(false);
      });
    }

    if (plus) {
      plus.addEventListener('click', function() {
        event.preventDefault();
        changeNumber(true);
      });
    }

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
})();

// Photo modify

(function() {
  if (!("FormData" in window) || !("FileReader" in window)) {
return; }
  var form = document.querySelector(".form-review");
  if (form) {
    var area = form.querySelector(".form-review__input-group--photo-group");
  }

  if (document.querySelector("#image-template")) {
    var template = document.querySelector("#image-template").innerHTML;
  }

  var queue = [];
    if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (ValidateForm()) {
        var data = new FormData(form);
        queue.forEach(function(element) {
          data.append("images", element.file);
        });
        request(data, function(response) {
          console.log(response);
          if (response) {
            document.querySelector(".modal--success").classList.add("modal--opened");
          }
          else {
            document.querySelector(".modal--failure").classList.add("modal--opened");
          }
        });
       };
    });
  }

  function ValidateForm() {
    var required = form.querySelectorAll('[data-req="required"]');
    for (var i = 0; i < required.length; i++) {
      if (required[i].value == null || required[i].value == '' || required[i].value == 0 || required[i].value == "0") {
        document.querySelector(".modal--failure").classList.add("modal--opened");
        return false;
      }
    }
    return true;
  }

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  if (form) {
    form.querySelector("#upload_photo").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });
  }

  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(template, {
        "image": event.target.result,
        "name": file.name
      });

      var figure = document.createElement("figure");
      figure.classList.add("form-review__photo");
      figure.innerHTML = html;

      area.appendChild(figure);

      figure.querySelector(".form-review__delete-link").addEventListener("click", function(event) {
        event.preventDefault();
        removePreview(figure);
      });

      queue.push({
        "file": file,
        "figure": figure
      });
    });

    reader.readAsDataURL(file);
  }
  function removePreview(figure) {
    queue = queue.filter(function(element) {
      return element.figure != figure; });
    figure.parentNode.removeChild(figure);
  }
})();

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
})();

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
})();

// Amount days
(function() {
  if (document.getElementById('start-date')) {
    var arrival = moment(document.getElementById('start-date').value);
  }

  if (duration) {
    var duration = Number(document.getElementById('duration').value);
  }

  var departure = document.getElementById('end-date');
  var durationblock = document.querySelector('.counter--duration');
  if (durationblock) {
    var minus = durationblock.querySelector('.counter__button--minus');
    var plus = durationblock.querySelector('.counter__button--plus');
  }

  if (minus) {
    minus.addEventListener('click', function() {
      event.preventDefault();
      var arrival = moment(document.getElementById('start-date').value);
      var duration = Number(document.getElementById('duration').value);
      CalculateDeparture(arrival, duration);
    });
  }

  if (plus) {
    plus.addEventListener('click', function() {
      event.preventDefault();
      var arrival = moment(document.getElementById('start-date').value);
      var duration = Number(document.getElementById('duration').value);
      CalculateDeparture(arrival, duration);
    });
  }


  function CalculateDeparture(arrival, duration) {
    enddate = arrival.add(duration, 'day');
    departure.value = enddate.format("YYYY-MM-DD");
  }
})();

// Google Map
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(35.1397977,-111.6429784)
  }
  var image = 'img/map-marker.png';

  var map = new google.maps.Map(document.getElementById('google-map'),
                                mapOptions);
  var myLatLng = new google.maps.LatLng(34.9897977,-111.6429784);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image
  });
}

if (google) {
  google.maps.event.addDomListener(window, 'load', initialize);
};
