const Property = require("../models/Property");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createProperty = async (req, res) => {
	try {
		const {
			title,
			category,
			price,
			location,
			description,
			bedrooms,
			bathrooms,
			propertyType,
			agent
		} = req.body;

		if (
			!title ||
			!category ||
			!price ||
			!location ||
			!description ||
			bedrooms === undefined ||
			bathrooms === undefined ||
			!propertyType ||
			!agent ||
			!req.file
		) {
			return res.status(400).json({
				message: "All fields and property image are required"
			});
		}

		const uploadResult = await uploadToCloudinary(
			req.file.buffer,
			"real-estate/properties"
		);

		const property = await Property.create({
			title,
			category,
			price,
			location,
			description,
			bedrooms,
			bathrooms,
			propertyType,
			image: uploadResult.secure_url,
			agent
		});

		const populatedProperty = await property.populate("agent");

		res.status(201).json({
			message: "Property created successfully",
			property: populatedProperty
		});
	} catch (error) {
		console.error("Create property error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getProperties = async (req, res) => {
	try {
		const properties = await Property.find()
			.populate("agent")
			.sort({ createdAt: -1 });

		res.json({
			properties
		});
	} catch (error) {
		console.error("Get properties error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getPropertyById = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id)
			.populate("agent");

		if (!property) {
			return res.status(404).json({
				message: "Property not found"
			});
		}

		res.json({
			property
		});
	} catch (error) {
		console.error("Get property error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const updateProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({
				message: "Property not found"
			});
		}

		const updateData = {
			...req.body
		};

		if (req.file) {
			const uploadResult = await uploadToCloudinary(
				req.file.buffer,
				"real-estate/properties"
			);

			updateData.image = uploadResult.secure_url;
		}

		const updatedProperty = await Property.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
				runValidators: true
			}
		).populate("agent");

		res.json({
			message: "Property updated successfully",
			property: updatedProperty
		});
	} catch (error) {
		console.error("Update property error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const deleteProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property) {
			return res.status(404).json({
				message: "Property not found"
			});
		}

		await Property.findByIdAndDelete(req.params.id);

		res.json({
			message: "Property deleted successfully"
		});
	} catch (error) {
		console.error("Delete property error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

module.exports = {
	createProperty,
	getProperties,
	getPropertyById,
	updateProperty,
	deleteProperty
};