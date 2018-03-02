$(document).ready(function(){

    
    var geocoder = new google.maps.Geocoder();
    $(".showWeather").click(function(){
        var address = $(".latlong").val();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
              lat = results[0].geometry.location.lat();
              long =results[0].geometry.location.lng();
              initialize(lat,long);
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
    
    });

    initialize(33.6348792,-117.7426695);
});

var map;
var service;
var infowindow;
var origin;
var lat;
var long;

function initialize(lat,long) {
    
    showWeather();
  origin = new google.maps.LatLng(lat,long);

  map = new google.maps.Map(document.getElementById('map'), {
      center: origin,
      zoom: 11
    });

  var request = {
    location: origin,
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

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    var dest = place.geometry.location;
    //{lat: 33.6350069, lng: -117.8105216};
    // Set destination, origin and travel mode.
    var request = {
        destination: dest,
        origin: origin,
        travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}

function initMap() {
    var chicago = {lat: 41.85, lng: -87.65};
    var losAngeles = {lat: 34.0201613, lng: -118.6919205};

    var map = new google.maps.Map(document.getElementById('map'), {
      center: chicago,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: losAngeles,
      origin: chicago,
      travelMode: 'DRIVING'
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }