import Fee from "../models/Fee.js";

// ➕ Create Fee
export const createFee = async (req, res) => {
  try {
    const { className, admissionFee, monthlyFee, annualFee } = req.body;

    const fee = await Fee.create({
      className,
      admissionFee,
      monthlyFee,
      annualFee,
    });

    res.status(201).json({
      message: "Fee added successfully",
      fee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Fees (Public)
export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });

    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Fee
export const updateFee = async (req, res) => {
  try {
    const { className, admissionFee, monthlyFee, annualFee } = req.body;

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    fee.className = className || fee.className;
    fee.admissionFee = admissionFee || fee.admissionFee;
    fee.monthlyFee = monthlyFee || fee.monthlyFee;
    fee.annualFee = annualFee || fee.annualFee;

    const updatedFee = await fee.save();

    res.json({
      message: "Fee updated successfully",
      updatedFee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Fee
export const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    await fee.deleteOne();

    res.json({ message: "Fee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};