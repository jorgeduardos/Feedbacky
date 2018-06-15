import recipientSchema = require('./Recipient.js');

const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// this tell mongoose that the survey schema belongs to a specific user (user that created the survey)
	_user: {type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date
});

mongoose.model("surveys", surveySchema);
