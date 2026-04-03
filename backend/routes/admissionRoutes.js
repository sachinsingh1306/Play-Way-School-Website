import express from "express";
import {
  createAdmission,
  getAdmissions,
} from "../controllers/admissionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createAdmission);

// Admin (Protected)
router.get("/", protect, getAdmissions);

export default router;