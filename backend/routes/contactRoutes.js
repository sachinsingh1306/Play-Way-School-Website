import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (Form submit)
router.post("/", createContact);

// Admin (Protected)
router.get("/", protect, getContacts);

export default router;