var Login = Login || {};



// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
		//Initialize
		initEvent(id);
		console.log("TEST");
		
    }
};

app.initialize();

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
});

app.signupController = new Login.SignUpController();


$(document).on("pagecontainerbeforeshow", function (event, ui) {
	
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signup":
                // Reset the signup form.
                app.signupController.resetSignUpForm();
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



// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


function initEvent(id) {
	console.log(id);
	
}

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
//myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
//	myApp.alert('Here comes About page');
//})

/*
myApp.onPageInit('locations', function (page) {
	locations.locationNames();
})

myApp.onPageInit('payments', function (page) {
	locations.locationNames();
})

rent
*/

// Option 2. Using one 'pageInit' event handler for all pages:
$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	locations.locationNames(page.name);
//    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
       // myApp.alert('Here comes About page');
//    }
})

// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});



// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
//})

//$$(document).ready( function() {
	//Get style sheet
	
	
//});