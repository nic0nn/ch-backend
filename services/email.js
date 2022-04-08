const nodemailer = require("nodemailer");
const configuration = require("../configuration");
const { Logger } = require("../utils");

const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = configuration;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: GMAIL_ACCOUNT,
		pass: GMAIL_PASSWORD
	}
});

exports.send = ({ to, subject, text }) => {
	const options = {
		to,
		subject,
		text
	};

	transporter.sendMail(options, function (error, info) {
		if (error) {
			Logger.error(error);
		} else {
			Logger.info("Email sent: " + info.response);
		}
	});
};
