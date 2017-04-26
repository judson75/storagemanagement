var Login = Login || {};

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
		console.log("TEST1");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
		console.log("TEST");
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
		console.log("ID: " + id)
    }
};

app.initialize();

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signupController = new Login.SignUpController();
app.signinController = new Login.SignInController();

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signupController.resetSignUpForm();
                break;
			case "page-signin":
                // Reset signin form.
                app.signinController.resetSignInForm();
                break;
        }
    }
});

$(document).delegate("#page-signup", "pagebeforecreate", function () {
    app.signupController.init();
    app.signupController.$btnSubmit.off("tap").on("tap", function () {
        app.signupController.onSignupCommand();
    });

});

$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signinController.init();
    app.signinController.$btnSubmit.off("tap").on("tap", function () {
        app.signinController.onSignInCommand();
    });
});

$(document).on('click', '#select-locations li', function() {
	var location_id = $(this).attr('data-id');
	var location_office_id = $(this).attr('data-office-id');
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("office_id", location_office_id);
	}
	//get location details...
	common.locationDetails(location_id);
});


$(document).on('click', '#select-location li', function() {
	var location_id = $(this).attr('data-id');
	var location_type = $(this).attr('data-type');
	//get location details...
	common.locationUnits(location_id, location_type);
});

$(document).on('click', '#select-units li', function() {
	var location_id = $(this).attr('data-id');
	var location_type = $(this).attr('data-type');
	//get location details...
	common.unitDetails(location_id, location_type);
});


$(document).on("pagecontainerbeforechange", function (event, ui) {
    if (typeof ui.toPage !== "object") return;
    console.log(ui.toPage.attr("id"));
    switch (ui.toPage.attr("id")) {
        case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = Login.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-main-menu");                
                }
            }
        break;
        case 'page-rent':
        	$.mobile.loading("show");
        	//var session = Login.Session.getInstance().get(),
            //        today = new Date();
            console.log(session);
            
			//If sessions locations not set...
			common.getLocations();
	//console.log("LOC: " + common.locations);		
			//If locations populate page
			//var locationString = JSON.stringify(locations);
			//var html = common.buildLocationsList(locationString);	
        break;
        case 'page-payments':
        	$.mobile.loading("show");
        	var html = '';
			//No units to show
			html += '<p>You do not have any units associated with your account. Pleae enter your unit number and access code below!</p>';
			html += '<label for="unit_number">Unit #</label>';
            html += '<input type="text" name="unit_number" id="unit_number" value="">';
            html += '<label for="access_code">Access Code</label>';
            html += '<input type="text" name="access_code" id="access_code" value="">';
            html += '<button id="btn-submit" class="ui-btn ui-btn-b ui-corner-all mc-top-margin-1-5">Submit</button>';
			$('.ui-content').html(html);
        break;
    }
});
