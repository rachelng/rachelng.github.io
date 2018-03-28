/*
Open Weather Map Instructions:

In this exercise, you will be leveraging the Open Weather Map API to fetch weather data for NYC and render the results in the DOM.

1) Setup an AJAX request to the Open Weather Map API:
- This task invovles building an endpoint using your API key, city of choice, and units of choice
- First, grab your API key from https://home.openweathermap.org/api_keys and plug it into API_KEY, below
- Next, add the following query parameters to URL, below:
  * 'q' - stands for 'query' - should be set equal to 'new+york,us'
  * 'units' should be set equal to your units of choice (imperial or metric)
  * 'APPID' should be set equal to API_KEY
- HINT: you will have to rely on string concatenation to build this URL
- CONSIDER: checking out the API docs to learn more about building your endpoint: https://openweathermap.org/current

2) Handle the API's response:
- First, investigate the data you are dealing with and print the AJAX's response using 'console.log(response)'
- Then, use jQuery DOM manipulation - *cough* .append() *cough* - to render the following into #nyc-weather:
  * The temperature
  * The hummidity
  * The wind speed

3) Change the background based on the temperature
- If the weather is good (your opinion) change the background to a happy Mayor de Blasio
- If the weather is bad (also, your opinion) change the background to a not-so-happy Mayor de Blasio

4) Want to be hardcore? Throw in a Google Map based off the response's lat/lng.
*/


// PART 1:
var API_KEY = 'ca3749d90ce5fb91677d2a7b3c5620ce'
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=new+york,us&units=metric&APPID=' + API_KEY 

// can't touch this - dunnn dun dun dun
$.ajax({
  type: 'GET',
  url: URL,
  success: handleSuccess
})

// PART 2 (and possibly 3 and 4):
function handleSuccess(response) {
  console.log(response)
  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: response.coord.lat, 
      lng: response.coord.lon
    },
    zoom: 12
  });

  $('#nyc-weather').append('<b>Temperature:</b> ' + response.main.temp + '&deg;C' + '<br />' + '<b>Humidity:</b> ' + response.main.humidity + '%' + '<br />' + '<b>Wind Speed:</b> ' + response.wind.speed + 'm/s')

  if (response.main.temp > 10) {
    $('body').css('background', 'url(https://thenypost.files.wordpress.com/2017/06/miamipostcard.jpg)')
  } else {
    $('body').css('background', 'url(http://nyoobserver.files.wordpress.com/2013/10/bill-de-blasio-park-slope-getty.jpg)')
  }
}

