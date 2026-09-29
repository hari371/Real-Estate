const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},

		category: {
			type: String,
			required: true,
			enum: ["residential", "commercial", "apartment"]
		},

		price: {
			type: Number,
			required: true
		},

		location: {
			type: String,
			required: true,
			trim: true
		},

		description: {
			type: String,
			required: true,
			trim: true
		},

		bedrooms: {
			type: Number,
			required: true
		},

		bathrooms: {
			type: Number,
			required: true
		},

		propertyType: {
			type: String,
			required: true,
			trim: true
		},

		image: {
			type: String,
			required: true
		},

		agent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Agent",
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Property", propertySchema);