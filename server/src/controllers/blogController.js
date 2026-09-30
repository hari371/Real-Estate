const Blog = require("../models/Blog");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createBlog = async (req, res) => {
	try {
		const {
			title,
			description,
			author
		} = req.body;

		if (
			!title ||
			!description ||
			!author ||
			!req.file
		) {
			return res.status(400).json({
				message: "All fields and blog image are required"
			});
		}

		const uploadResult = await uploadToCloudinary(
			req.file.buffer,
			"real-estate/blogs"
		);

		const blog = await Blog.create({
			title,
			description,
			author,
			image: uploadResult.secure_url
		});

		res.status(201).json({
			message: "Blog created successfully",
			blog
		});
	} catch (error) {
		console.error("Create blog error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find()
			.sort({ createdAt: -1 });

		res.json({
			blogs
		});
	} catch (error) {
		console.error("Get blogs error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const getBlogById = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);

		if (!blog) {
			return res.status(404).json({
				message: "Blog not found"
			});
		}

		res.json({
			blog
		});
	} catch (error) {
		console.error("Get blog error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const updateBlog = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);

		if (!blog) {
			return res.status(404).json({
				message: "Blog not found"
			});
		}

		const updateData = {
			...req.body
		};

		if (req.file) {
			const uploadResult = await uploadToCloudinary(
				req.file.buffer,
				"real-estate/blogs"
			);

			updateData.image = uploadResult.secure_url;
		}

		const updatedBlog = await Blog.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
				runValidators: true
			}
		);

		res.json({
			message: "Blog updated successfully",
			blog: updatedBlog
		});
	} catch (error) {
		console.error("Update blog error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

const deleteBlog = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);

		if (!blog) {
			return res.status(404).json({
				message: "Blog not found"
			});
		}

		await Blog.findByIdAndDelete(req.params.id);

		res.json({
			message: "Blog deleted successfully"
		});
	} catch (error) {
		console.error("Delete blog error:", error.message);

		res.status(500).json({
			message: "Server error"
		});
	}
};

module.exports = {
	createBlog,
	getBlogs,
	getBlogById,
	updateBlog,
	deleteBlog
};