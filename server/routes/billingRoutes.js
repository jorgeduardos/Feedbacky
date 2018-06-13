const keys = require("../config/keys.js");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin.js");

module.exports = app => {
	app.post("/api/stripe", requireLogin, async (req, res) => {
		// cheking if the user is logged in

		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			source: req.body.id, // obtained with Stripe.js
			description: "Testing"
		});

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
