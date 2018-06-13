// requiring all dependencies
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// since passport is not returning anything, there is no need to assign it to a variable
require("./models/User.js");
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

//telling the app to listen to port using enviromental variable, use port 5000 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT);
