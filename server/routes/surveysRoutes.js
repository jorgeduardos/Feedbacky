const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin.js");
const enoughCredits = require("../middlewares/enoughCredits.js");

const Survey = mongoose.model("surveys");

module.exports = app => {
	app.post("/api/surveys", requireLogin, enoughCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			// create an array of strins, and then map through that array to create an object
			recipients: recipients
				.split(",")
				.map(email => ({ email: email.trim() })),
			// linking this survey to the user of the app in the db
			_user: req.user.id,
			dateSent: Date.now()
		});
	});
};
