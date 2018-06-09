const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");

//Configuring the googleStrategy using passport
passport.use(
	//creating new instance of googleStrategy
	new GoogleStrategy(
		// googleStartegy accepts an object as a parameter which cointains the id,
		// secret and callback that is going to be used to redirect to our app
		//the second parameter is a callback function that returns the profile os the user loging using google
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log("acces token", accessToken);
			console.log("refresh token", refreshToken);
			console.log("profile", profile);
		}
	)
);
