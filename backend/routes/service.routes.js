import express from "express";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.delete("/", deleteAllServices);

export default router;
