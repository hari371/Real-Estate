const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const agentRoutes = require("./routes/agentRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "Real Estate API is running"
	});
});

app.use("/api/auth", authRoutes);

app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/blogs", blogRoutes);

module.exports = app;