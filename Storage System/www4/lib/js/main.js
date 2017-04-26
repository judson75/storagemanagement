// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

var Login = Login || {};

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
		document.addEventListener('offline', this.onDeviceOffline, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
	onDeviceOffline: function () {
        app.receivedEvent('offline');
		console.log("TEST");
    },
    receivedEvent: function (id) {
		console.log("ID: " + id)
    }
};

app.initialize();

app.signupController = new Login.SignUpController();
app.signinController = new Login.SignInController();


$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	console.log("PAGE: " + page.name);
	switch(page.name) {
		case 'login':
			app.signinController.init();
  			app.signinController.$btnSubmit.off("tap").on("tap", function () {
    			app.signinController.onSignInCommand();
    		});
			break;
		case 'signup':
			app.signupController.init();
			app.signupController.$btnSubmit.off("tap").on("tap", function () {
				app.signupController.onSignupCommand();
			});
			break;
	} 
});

$$(document).on("pagecontainerbeforechange", function (event, ui) {
	alert("J");
});


$(document).on('deviceready', function() {
	window.localStorage.clear();
	if(window.localStorage.getItem('initial_load') === null) {
		$('.splash').remove();
		window.localStorage.setItem('initial_load', 1);
	}
});

$(document).on('click', '#home-link',  function (event, ui) {
	//alert("J");
	var session = Login.Session.getInstance().get(),
		today = new Date();
	if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
		
	}
	if(session) {
		$('#login').hide();
		$('#page-main-menu').show();
		$('#welcome-message').html("Welcome " + session.first_name + "!");
	}
	
});

/*
// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
*/