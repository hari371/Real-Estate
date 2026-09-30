const express = require("express");

const {
	createAgent,
	getAgents,
	getAgentById,
	updateAgent,
	deleteAgent
} = require("../controllers/agentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAgents);
router.get("/:id", getAgentById);

// Admin routes
router.post(
	"/",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	createAgent
);

router.put(
	"/:id",
	authMiddleware,
	adminMiddleware,
	upload.single("image"),
	updateAgent
);

router.delete(
	"/:id",
	authMiddleware,
	adminMiddleware,
	deleteAgent
);

module.exports = router;