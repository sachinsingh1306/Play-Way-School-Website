import express from "express";
import {
  createFee,
  getFees,
  updateFee,
  deleteFee,
} from "../controllers/feeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getFees);

// Admin
router.post("/", protect, createFee);
router.put("/:id", protect, updateFee);
router.delete("/:id", protect, deleteFee);

export default router;