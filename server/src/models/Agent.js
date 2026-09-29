const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},

		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},

		phone: {
			type: String,
			required: true,
			trim: true
		},

		description: {
			type: String,
			required: true,
			trim: true
		},

		image: {
			type: String,
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Agent", agentSchema);