import Contact from "../models/contact.model.js";

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create contact
export const createContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllContact = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: "All contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contacts", error });
  }
};
