var Login = Login || {};

Login.Session = (function () {
    var instance;

    function init() {
        var sessionIdKey = "bookit-session";
        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },
            get: function () {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } 
				catch(e){}
                return result;
            },
			clear: function () {
				window.localStorage.clear();
			}
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
           return instance;
        }
    };
}());