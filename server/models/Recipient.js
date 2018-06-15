//  submodel used on the survey collection

const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
