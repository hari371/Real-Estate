const express = require("express");

const {
	createAgent,
	getAgents,
	getAgentById,
	updateAgent,
	deleteAgent
} = require("../controllers/agentController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getAgents);
router.get("/:id", getAgentById);

router.post(
	"/",
	authMiddleware,
	upload.single("image"),
	createAgent
);

router.put(
	"/:id",
	authMiddleware,
	upload.single("image"),
	updateAgent
);

router.delete(
	"/:id",
	authMiddleware,
	deleteAgent
);

module.exports = router;