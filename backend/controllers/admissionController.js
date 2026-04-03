import Admission from "../models/Admission.js";

// 🎓 Create Admission Request
export const createAdmission = async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      phone,
      email,
      classApplied,
      message,
    } = req.body;

    const admission = await Admission.create({
      studentName,
      parentName,
      phone,
      email,
      classApplied,
      message,
    });

    res.status(201).json({
      message: "Admission request submitted",
      admission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Admissions (Admin)
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};