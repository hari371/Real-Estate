const express = require("express");

const {
	createProperty,
	getProperties,
	getPropertyById,
	updateProperty,
	deleteProperty
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);

router.post(
	"/",
	authMiddleware,
	upload.single("image"),
	createProperty
);

router.put(
	"/:id",
	authMiddleware,
	upload.single("image"),
	updateProperty
);

router.delete(
	"/:id",
	authMiddleware,
	deleteProperty
);

module.exports = router;