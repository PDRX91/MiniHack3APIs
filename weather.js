

function showWeather(){
    var geocoder = new google.maps.Geocoder();
    var lat;
    var long;
    // var latlong = $(".latlong").val();
    $(".showWeather").click(function(){
        var address = $(".latlong").val();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == 'OK') {
              lat = results[0].geometry.location.lat();
              long =results[0].geometry.location.lng();
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        $.ajax({
        url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + lat + ',' + long,
        dataType: 'jsonp',
        method: 'get',
        success: function(response){
            console.log(response);
            $(".timezone").text('Timezone: ' +response.timezone);
            $(".temp").text(response.currently.temperature + ' Degrees Farenheit');
            // $(".alerts").text('Current Alerts in this area: ' +response.alerts[0].title);
            $(".currentConditions").text('It is currently: ' +response.currently.summary);
        },
        error: function(response){
            console.log('Error')
        }
        })
    })
}