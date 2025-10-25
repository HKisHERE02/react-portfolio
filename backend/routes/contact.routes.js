import express from "express";
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.delete("/", deleteAllContact);
export default router;
