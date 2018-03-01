// GOOGLE MAP SETUP HERE:

var map = new google.maps.Map(document.getElementById('map'), {
  center: {
  	lat: 40.7127, 
  	lng: -74.0059
  },
  zoom: 13
});

// CITIBIKE PROJECT HERE:
function renderCitiBikeMarkers(stations) {
  // YOUR CODE HERE!

  stations.forEach(function(station) {

  	var marker = new google.maps.Marker({
  		position: {
  			lat: station.lat / 1000000,
  			lng: station.lng / 1000000
  		},
  		map: map,
  		title: station.name
  	});

  	var contentString = '<h3>' + station.name + '</h3>' + '<p><b>Bikes: </b>' + station.bikes + '</p>' + '<p><b>Free Spaces: </b>' + station.free + '</p>'

  	var infowindow = new google.maps.InfoWindow( {
  		content: contentString
  	});

  	marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
}

// AJAX request to fetch the station data from CitiBike's API
// Warning! Do not break this :D
$.ajax({
	type: 'GET',
	url: 'http://api.citybik.es/citi-bike-nyc.json',
	success: renderCitiBikeMarkers,
});
