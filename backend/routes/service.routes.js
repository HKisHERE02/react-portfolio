import express from "express";
import {
  getServices,
  createService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.delete("/:id", deleteService);

export default router;
