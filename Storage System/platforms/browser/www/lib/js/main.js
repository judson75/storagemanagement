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

$(document).on("pagecontainerbeforechange", function (event, ui) {
    if (typeof ui.toPage !== "object") return;
    switch (ui.toPage.attr("id")) {
        case "page-index":
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = BookIt.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-main-menu");                }
            }
    }
});
