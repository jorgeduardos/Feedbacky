const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

// making use (fetching data) out of our db collection name 'users'
const User = mongoose.model("users");

// defining serializeUser function so passport can attach token to coockie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

//Configuring the googleStrategy using passport (talling passport to use googleStrategy)
passport.use(
	//creating new instance of googleStrategy
	new GoogleStrategy(
		// googleStartegy accepts an object as a parameter which cointains the id, secret and callback url that is going to be used to redirect to our app,
		//the second parameter is a callback function that returns the profile of the user loging using googleOauth
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			//mongoose query to see if that id exists already
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					// instanciating new user and saving id to db
					// receiving promise and calling done so passport knows we are done
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
