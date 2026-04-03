import Contact from "../models/Contact.js";

// 📩 Create Inquiry
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Inquiry submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 Get All Inquiries (Admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};