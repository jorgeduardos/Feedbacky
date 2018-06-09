// adding dependecnies
const mongoose = require("mongoose");
const { Schema } = mongoose;

//mongoose needs a schema for a model class
const userSchema = new Schema({
	googleId: String
});

// creating the model class with the shema define above
mongoose.model("users", userSchema);
