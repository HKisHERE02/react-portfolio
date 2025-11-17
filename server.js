import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./backend/routes/auth.routes.js";
import userRoutes from "./backend/routes/user.routes.js";
import contactRoutes from "./backend/routes/contact.routes.js";
import projectRoutes from "./backend/routes/project.routes.js";
import serviceRoutes from "./backend/routes/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://userharsh:userharsh@cluster0.rrv9shc.mongodb.net/Portfolio"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection failed", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => res.send("Backend is running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
