// $.ajax({
// 	url: '/geo',
// 	type: 'GET',
// 	success: function (response) {
// 		var latitude = response.coord.lat
// 		var longitude = response.coord.lon

// 		buildMap(latitude, longitude)
// 	}
// })

// $('#btn').click(function() {
// 	event.preventDefault()
	
// 	navigator.geolocation.getCurrentPosition(handleResponse)

// 	function handleResponse(position) {
// 	  buildMap(position.coords.latitude, position.coords.longitude)
// 	}
// })


navigator.geolocation.getCurrentPosition(function(position) {
	console.log(position)

	var lat = position.coords.latitude
	var lng = position.coords.longitude

	fetchGeoWeather(lat, lng)
	buildMap(lat, lng)
})

function fetchGeoWeather(lat, lng) {
	$.ajax({
		url: '/coords/lat/' + lat + '/lng/' + lng,
		type: 'GET',
		success: function(response)  {
			console.log(response)
		},
	})
}

function buildMap(latitude, longitude) {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {
		  lat: latitude, 
		  lng: longitude
		},
		zoom: 8
	})

	var marker = new google.maps.Marker({
		position: {
		  lat: latitude,
		  lng: longitude
		},
		map: map
	})
}