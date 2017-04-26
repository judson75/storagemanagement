
/*
 // Start the common functionality
 */

'use strict';
	
(function() {
	
	var common = {
		serviceURL: 'https://www.puretxt.com/judson/storage/api/v1/',
		clientAPI: '12345',
		clientID: '1',
	};
	
	window.common = common;
	
	common.Spinner = function () {
		$('#pageOverlay').show();	
	}
	
	common.RemoveSpinner = function () {
		$('#pageOverlay').hide();
		
	}
		
	common.getLocations = function() {
		console.log("GETTING LOCATIONS");
		$.ajax({
	        type: 'POST',
	        url: common.serviceURL + "get.json?action=get_locations",
	        data: {'client' : common.clientID},
	        success: function (resp) {
	        	//console.log("RESP: " + resp);
				//console.log("RESP CODE: " + resp.code);
				//console.log("RESP DATA: " + resp.data);
	            $.mobile.loading("hide");
	            if (resp.code === 1) {
	            	//this.locations = resp.data;
	            	common.buildLocationsList(resp.data);
	            }
	        },
	        error: function (e) {
	        	console.log("ERROR: " + e);

	        }
	    });
	
	};
	
	common.buildLocationsList = function(locations) {
		var html = '<h3>Choose Your Location:</h3><ul class="select-buttons" id="select-locations">';
		$(locations).each(function( index, location ) {
			//sconsole.log("UI: " + index + ' - ' + location);
			html += '<li data-id="' + location.id + '" data-office-id="' + location.office_id + '"><b>' + location.office_id + '</b> ' + location.address + '</li>';
		});
		html += '</ul>';
		$('.ui-content').html(html);
		$.mobile.loading("hide");
	};
	
	
	common.locationDetails = function(location_id) {
		var office_id = localStorage.getItem("office_id");
		$('.page-header').html('Rent Unit - ' + office_id);
		var html = '<ul class="select-buttons" id="select-location">';
		html += '<li data-id="' + location_id + '" data-type="Climate Controlled"><span class="li-left">Climate Controlled<br><small>Climate Controlled</small></span> <span class="li-right"><small>Starting at</small><br />$93</span><span class="clr"></span></li>';
		html += '</ul>'; 
		$('.ui-content').html(html);

	};
	
	
	common.locationUnits = function(location_id, location_type) {
		var office_id = localStorage.getItem("office_id");
		var html = '<h3>' + office_id + '</h3>';
		html += '<p>' + location_type + '</p>';
		html += '<ul class="select-buttons" id="select-units">';
		html += '<li data-id="' + location_id + '" data-type="' + location_type + '" ><span class="li-left">Unit 28 (5 x 10)<br /><small>Second Floor</small></span> <span class="li-right">$93 <small>/ mo.<br /><small>$58 first mo.</small></span><span class="clr"></span></li>';
		html += '<li data-id="' + location_id + '" data-type="' + location_type + '" ><span class="li-left">Unit 28 (5 x 10)<br /><small>Second Floor</small></span> <span class="li-right">$93 <small>/ mo.<br /><small>$58 first mo.</small></span><span class="clr"></span></li>';
		html += '<li data-id="' + location_id + '" data-type="' + location_type + '" ><span class="li-left">Unit 28 (5 x 10)<br /><small>Second Floor</small></span> <span class="li-right">$93 <small>/ mo.<br /><small>$58 first mo.</small></span><span class="clr"></span></li>';		html += '</ul>'; 
		$('.ui-content').html(html);

	};

	common.unitDetails  = function(location_id, location_type) {
		var office_id = localStorage.getItem("office_id");
		var html = '<h3>' + office_id + '</h3>';
		html += '<div id="monthly-cost" class="mc-text-center">$93/mo.</div>';
		html += '<p class="mc-text-center">Unit 28 (5 x 10)<br />Second Floor<br />123 Mn street, Brandon, MS 39042<br />601-555-1234</p>';
		html += '<div id="intro-cost" class="mc-text-center">$58<br /><small>introductory rate</small></div>';
		html += '<div class="addl-cost mc-text-center">$20 Admin Fee</div>';

		html += '<a href="#dlg-sign-up-sent" data-rel="popup" data-transition="pop" data-position-to="window" id="btn-submit" class="ui-btn ui-btn-b ui-corner-all mc-top-margin-1-5 pay-btn">Pay $78*</a>';
		html += '<p class="mc-text-center"><small>* After the intro rate, your monthly payment will be $98 per month</small></p>';
		$('.ui-content').html(html);

	};


		
}());