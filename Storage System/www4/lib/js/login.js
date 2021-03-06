var Login = Login || {};

Login.SignInController = function () {
    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtEmailAddress = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

Login.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-login");
    this.mainMenuPageId = "#page-main-menu";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtEmailAddress = $("#txt-email", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

Login.SignInController.prototype.emailAddressIsValid = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

Login.SignInController.prototype.resetSignInForm = function () {
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";
    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtEmailAddress.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtEmailAddress.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);
};

Login.SignInController.prototype.onSignInCommand = function () {
    var me = this,
        emailAddress = me.$txtEmailAddress.val().trim(),
        password = me.$txtPassword.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtEmailAddress.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtEmailAddress.addClass(invalidInputStyle);
        invalidInput = true;
    }

    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    if (!me.emailAddressIsValid(emailAddress)) {
        me.$ctnErr.html("<p>Please enter a valid email address.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        me.$txtEmailAddress.addClass(invalidInputStyle);
        return;
    }
//console.log("URL: " + Login.Settings.signInUrl + " - Email: " + emailAddress + " - PAW: " + password);
    $.mobile.loading("show");	
	
	$.ajax({
        type: 'POST',
        url: Login.Settings.signInUrl,
        data: {'email': emailAddress, 'password' : password},
        success: function (resp) {
			console.log(resp);
            $.mobile.loading("hide");
            if (resp.code === 1) {
                // Create session. 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + Login.Settings.sessionTimeoutInMSec);
                Login.Session.getInstance().set({
                    userProfileModel: resp.userProfileModel,
                    sessionId: resp.sessionId,
                    first_name: resp.first_name,
                    locations: resp.locations,
                    last_name: resp.last_name,
                    expirationDate: expirationDate,
                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
                });
				
				
				var session = Login.Session.getInstance().get();
				console.log("SESS: " + session);


                // Go to main menu.
                //$.mobile.navigate(me.mainMenuPageId);
				//ui.toPage = $("#page-main-menu");
		//		window.location.href = "index.html";
                return;
            } 
			else {
				me.$ctnErr.html("<p>Oops! Login had a problem and could not log you on. Please try again in a few minutes.</p>");
                me.$ctnErr.addClass("bi-ctn-err").slideDown();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.mobile.loading("hide");
            console.log(xhr.responseText + " " + xhr.responseJSON);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! Login had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
 
    
};