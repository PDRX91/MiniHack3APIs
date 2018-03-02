$(document).ready(initialize);

var map;
var service;
var infowindow;

function initialize() {
    
    showWeather();
  var pyrmont = new google.maps.LatLng(33.6348792,-117.7426695,17);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 11
    });

  var request = {
    location: pyrmont,
    radius: '10000',
    name: "In-N-Out"
  };
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        icon: 'inOut.png',
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function(){
          getInfo(this,place);
    });
}

function getInfo(event,place){
    var $place = $('<div>',{
        text: place.name,
        class: 'info'
    });
    var address = $('<p>',{
        text: place.vicinity        
    });
    $place.append(address);
    var open = $('<p>',{
        text: place.opening_hours.open ? 'Open Now' : 'Close'        
    });
    $place.append(open);

    infowindow.setContent($place[0]);
    infowindow.open(map, event);
}