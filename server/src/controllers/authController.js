const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				message: "All fields are required"
			});
		}

		const existingUser = await User.findOne({ email });

		if (existingUser && existingUser.isVerified) {
			return res.status(400).json({
				message: "Email already registered"
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const hashedOTP = await bcrypt.hash(otp, 10);

		const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		let user;

		if (existingUser) {
			existingUser.name = name;
			existingUser.password = hashedPassword;
			existingUser.otp = hashedOTP;
			existingUser.otpExpiresAt = otpExpiresAt;

			user = await existingUser.save();
		} else {
			user = await User.create({
				name,
				email,
				password: hashedPassword,
				role: "admin",
				isVerified: false,
				otp: hashedOTP,
				otpExpiresAt
			});
		}

		await sendEmail(email, otp);

		res.status(201).json({
			message: "Registration successful. OTP sent to your email."
		});
	} catch (error) {
		console.error("Register error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const verifyOTP = async (req, res) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({
				message: "Email and OTP are required"
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				message: "User not found"
			});
		}

		if (user.isVerified) {
			return res.status(400).json({
				message: "Email already verified"
			});
		}

		if (!user.otp || !user.otpExpiresAt) {
			return res.status(400).json({
				message: "OTP not found. Please register again."
			});
		}

		if (new Date() > user.otpExpiresAt) {
			return res.status(400).json({
				message: "OTP has expired. Please register again."
			});
		}

		const isOTPValid = await bcrypt.compare(otp, user.otp);

		if (!isOTPValid) {
			return res.status(400).json({
				message: "Invalid OTP"
			});
		}

		user.isVerified = true;
		user.otp = undefined;
		user.otpExpiresAt = undefined;

		await user.save();

		res.json({
			message: "Email verified successfully"
		});
	} catch (error) {
		console.error("Verify OTP error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password are required"
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				message: "User not found"
			});
		}

		if (!user.isVerified) {
			return res.status(401).json({
				message: "Please verify your email first"
			});
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid email or password"
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1d"
			}
		);

		res.json({
			message: "Login successful",
			token
		});
	} catch (error) {
		console.error("Login error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

module.exports = {
	register,
	verifyOTP,
	login
};