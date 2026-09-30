const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},

		image: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: true,
			trim: true
		},

		author: {
			type: String,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Blog", blogSchema);