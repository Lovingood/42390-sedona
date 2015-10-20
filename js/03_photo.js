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
})()
