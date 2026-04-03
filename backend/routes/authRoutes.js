import express from "express";
import { loginAdmin } from "../controllers/authController.js";

const router = express.Router();

// Login Route
router.post("/login", loginAdmin);

export default router;