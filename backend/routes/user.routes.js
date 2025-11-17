import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/user.controller.js";

import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.delete("/", protect, admin, deleteAllUsers);

router.get("/:id", protect, getUser);
router.post("/", protect, admin, createUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
