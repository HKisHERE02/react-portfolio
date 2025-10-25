import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.delete("/", deleteAllProjects);

export default router;
