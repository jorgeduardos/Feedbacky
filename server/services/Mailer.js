const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys.js");

class Mailer extends helper.Mail {}
