const express = require("express");

const {
	createProperty,
	getProperties,
	getPropertyById,
	updateProperty,
	deleteProperty
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);

router.post(
	"/",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	createProperty
);

router.put(
	"/:id",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	updateProperty
);

router.delete(
	"/:id",
	authMiddleware,
	adminMiddleware,
	deleteProperty
);

module.exports = router;