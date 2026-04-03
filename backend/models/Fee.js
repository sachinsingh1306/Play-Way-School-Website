import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    admissionFee: Number,
    monthlyFee: Number,
    annualFee: Number,
  },
  { timestamps: true }
);

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;