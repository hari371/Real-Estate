const express = require("express");

const {
	createBlog,
	getBlogs,
	getBlogById,
	updateBlog,
	deleteBlog
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.post(
	"/",
	authMiddleware,
	upload.single("image"),
	createBlog
);

router.put(
	"/:id",
	authMiddleware,
	upload.single("image"),
	updateBlog
);

router.delete(
	"/:id",
	authMiddleware,
	deleteBlog
);

module.exports = router;