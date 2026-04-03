import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";
import galleryRoutes from "./routes/galleryRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";


// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/contact", contactRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static(path.join("uploads")));
app.use("/api/gallery", galleryRoutes);
app.use("/api/fees", feeRoutes); 


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});