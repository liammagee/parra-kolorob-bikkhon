
    var distanceTotal = 0;
    var durationTotal = 0;

calculateGoogleRoute = function(map, from, to, selectedMode, index) {
    var directionsService = new google.maps.DirectionsService();

    var directionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode["WALKING"],
      unitSystem: google.maps.UnitSystem.METRIC
    };

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [from],
        destinations: [to],
        travelMode: google.maps.TravelMode["WALKING"],
        // transitOptions: TransitOptions,
        // drivingOptions: DrivingOptions,
  	    unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true,
      }, function(response, status) {
      
        var rows = response.rows;
        var element = rows[0].elements[0];
        var distance = element.distance;
        var duration = element.duration;
      	distanceTotal += (Math.round(distance.value/100)/10);
      	durationTotal += duration.value;

        // Add info on service providers
        $('#goog-dist-' + index).html(distance.text);
        $('#goog-dur-' + index).html(duration.text);

      	$('#goog-dis-tot').html( distanceTotal + ' kms' );
      	$('#goog-dur-tot').html( Math.round(durationTotal /60) + ' mins' );
    });


    directionsService.route(
      directionsRequest,
      function(response, status)	{
        if (status == google.maps.DirectionsStatus.OK) {
	       	if (response.routes.length >= 1) {
	       		var route = response.routes[0];
	       		var overview_path = route.overview_path;
	       		var points = [];
	       		overview_path.forEach(function(p) {
	       			points.push(new L.LatLng(p.lat(), p.lng()));
	       		})
	       		drawPoints(map, points);
	       	}
        }
        else {
			$("#error").append("Unable to retrieve your route<br />");
        }
      }
    );
}



