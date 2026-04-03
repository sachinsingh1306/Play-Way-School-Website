import Gallery from "../models/Gallery.js";

// 📸 Upload Image
export const uploadImage = async (req, res) => {
  try {
    const imagePath = req.file.filename;

    const gallery = await Gallery.create({
      image: imagePath,
      title: req.body.title || "",
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      gallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.deleteOne();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};