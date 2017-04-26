var Login = Login || {};
Login.Settings = Login.Settings || {};
Login.Settings.apiURL = 'https://www.puretxt.com/judson/storage/api/v1/';
Login.Settings.signUpUrl = Login.Settings.apiURL + 'post.json?action=register';
Login.Settings.signInUrl = Login.Settings.apiURL + 'post.json?action=login';
Login.Settings.sessionTimeoutInMSec = 1800000; //30 min