const passport = require("passport");

// exporting arrow function with app as the argument so it can be called inside index.js
// this so we dont have to require express to times "dry code"
module.exports = app => {
	//seting up google oauth route and telling passport tu authenticate using googleStrategy
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			prompt: "consent",
			scope: ["profile", "email"]
		})
	);

	//seting callback route when google answers the authentication
	//passport handles using googleStrategy
	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/survey");
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
