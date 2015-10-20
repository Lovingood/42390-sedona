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
}
