'use strict';
	
	
(function() {
	var locations = {
		
	};
	
	window.locations = locations;
	
	
	locations.locationNames = function () {
		//console.log(common.serviceURL);
		common.Spinner();
		$$.get( common.serviceURL + "get.json?action=test&user=1&p1=2", function( response ) {
			console.log("RESP: " + response);
			var obj = JSON.parse(response);
			var locations_htm = '<ul class="select-buttons" id="select-locations">';
			$$.each( obj.data, function( location_name, location_id ) {
				locations_htm += '<li data-id="' + location_id + '">' + location_name + '</li>';
			});
			locations_htm += '</ul>';
			$$('#locations-content').html(locations_htm);

		});
		
		
		
		
		common.RemoveSpinner();
		
	}
}());