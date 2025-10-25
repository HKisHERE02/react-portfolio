import Service from "../models/service.model.js";

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single service
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create service
export const createService = async (req, res) => {
  const service = new Service(req.body);
  try {
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAllServices = async (req, res) => {
  try {
    await Service.deleteMany({});
    res.status(200).json({ message: "All services deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting services", error });
  }
};
