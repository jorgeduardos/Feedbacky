// requiring all dependencies
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// since passport is not returning anything, there is no need to assign it to a variable
require("./models/User.js");
require("./models/Survey.js");
require("./services/passport.js");

//telling mongoose to connect to our db
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

//telling our server to use cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//ecryption key
		keys: [keys.cookieKey]
	})
);

// initilize authentication module "passport"
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes.js")(app);
require("./routes/billingRoutes.js")(app);
require("./routes/surveysRoutes.js")(app);

//  handling react routes correctly by the server in production
if (process.env.NODE_ENV === "production") {
	// Express will serve up production assests
	app.use(express.static("client/build"));
	// Express will serve up the index.html file if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

//telling the app to listen to port using enviromental variable, use port 5000 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT);
