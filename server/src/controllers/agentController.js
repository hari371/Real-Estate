const Agent = require("../models/Agent");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createAgent = async (req, res) => {
	try {
		const {
			name,
			email,
			phone,
			description
		} = req.body;

		if (
			!name ||
			!email ||
			!phone ||
			!description
		) {
			return res.status(400).json({
				message: "All fields are required"
			});
		}

		let image = "";

        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                "real-estate/agents"
            );

            image = uploadResult.secure_url;
        }

        const agent = await Agent.create({
            name,
            email,
            phone,
            description,
            image
        });

		res.status(201).json({
			message: "Agent created successfully",
			agent
		});
	} catch (error) {
		console.error("Create agent error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getAgents = async (req, res) => {
	try {
		const agents = await Agent.find()
			.sort({ createdAt: -1 });

		res.json({
			agents
		});
	} catch (error) {
		console.error("Get agents error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getAgentById = async (req, res) => {
	try {
		const agent = await Agent.findById(req.params.id);

		if (!agent) {
			return res.status(404).json({
				message: "Agent not found"
			});
		}

		res.json({
			agent
		});
	} catch (error) {
		console.error("Get agent error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const updateAgent = async (req, res) => {
	try {
		const agent = await Agent.findById(req.params.id);

		if (!agent) {
			return res.status(404).json({
				message: "Agent not found"
			});
		}

		const updateData = {
			...req.body
		};

		if (req.file) {
			const uploadResult = await uploadToCloudinary(
				req.file.buffer,
				"real-estate/agents"
			);

			updateData.image = uploadResult.secure_url;
		}

		const updatedAgent = await Agent.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
				runValidators: true
			}
		);

		res.json({
			message: "Agent updated successfully",
			agent: updatedAgent
		});
	} catch (error) {
		console.error("Update agent error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const deleteAgent = async (req, res) => {
	try {
		const agent = await Agent.findById(req.params.id);

		if (!agent) {
			return res.status(404).json({
				message: "Agent not found"
			});
		}

		await Agent.findByIdAndDelete(req.params.id);

		res.json({
			message: "Agent deleted successfully"
		});
	} catch (error) {
		console.error("Delete agent error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

module.exports = {
	createAgent,
	getAgents,
	getAgentById,
	updateAgent,
	deleteAgent
};