import express from "express";
import {
  uploadImage,
  getGallery,
  deleteImage,
} from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public
router.get("/", getGallery);

// Admin
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

export default router;