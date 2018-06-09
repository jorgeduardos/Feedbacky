// requiring all dependencies
const express = require("express");

// since passport is not returning anything, there is no need to assign it to a variable
require("./services/passport.js");

const app = express();

require("./routes/authRoutes.js")(app);

//telling the app to listen to port using enviromental variable, use port 5000 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT);
