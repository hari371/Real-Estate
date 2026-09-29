const nodemailer = require("nodemailer");

const sendEmail = async (to, otp) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to,
		subject: "Real Estate Admin OTP Verification",
		text: `Your OTP is ${otp}. This OTP will expire in 10 minutes.`
	});
};

module.exports = sendEmail;