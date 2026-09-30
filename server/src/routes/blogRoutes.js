const express = require("express");

const {
	createBlog,
	getBlogs,
	getBlogById,
	updateBlog,
	deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin routes
router.post(
	"/",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	createBlog
);

router.put(
	"/:id",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	updateBlog
);

router.delete(
	"/:id",
	authMiddleware,
	adminMiddleware,
	deleteBlog
);

module.exports = router;