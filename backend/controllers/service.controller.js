import Service from "../models/service.model.js";

export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

export const createService = async (req, res) => {
  const service = new Service(req.body);
  const saved = await service.save();
  res.status(201).json(saved);
};

export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
