
/*
 // Start the common functionality
 */

'use strict';
	
(function() {
	
	var common = {
		serviceURL: 'https://www.puretxt.com/judson/storage/api/v1/',
		clientAPI: '',
	};
	
	window.common = common;
	
	common.Spinner = function () {
		$('#pageOverlay').show();
		
	}
	
	common.RemoveSpinner = function () {
		$('#pageOverlay').hide();
		
	}
	
	//console.log(common.serviceURL);
	
	//Get User details
	/*
	$.get( common.serviceURL + "get.json?action=test&user=1&p1=2", function( response ) {
		console.log("RESP: " + response);
		var obj = JSON.parse(response);
		

	});
	*/
	
}());