import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./backend/routes/contact.routes.js";
import projectRoutes from "./backend/routes/project.routes.js";
import serviceRoutes from "./backend/routes/service.routes.js";
import userRoutes from "./backend/routes/user.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://userharsh:userharsh@cluster0.rrv9shc.mongodb.net/Portfolio?appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ Database connection failed:", err));

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// Root
app.get("/", (req, res) => res.send("Backend is running fine!"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
