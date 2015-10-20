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
})()
