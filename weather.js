$(document).ready(start);
function start(){
    showWeather();
}

function showWeather(){
    // var latlong = $(".latlong").val();
    $(".showWeather").click(function(){
        $.ajax({
            url: 'https://api.darksky.net/forecast/5c290eacf434280dddb202f23f1d7daa/' + $(".latlong").val(),
            dataType: 'jsonp',
            method: 'get',
            success: function(response){
                console.log(response);
                $(".timezone").text('Timezone: ' +response.timezone);
                $(".temp").text(response.currently.temperature + ' Degrees Farenheit');
                $(".alerts").text('Current Alerts in this area: ' +response.alerts[0].title);
                $(".currentConditions").text('It is currently: ' +response.currently.summary);
            },
            error: function(response){
                console.log('Error')
            }
        })
    })
}