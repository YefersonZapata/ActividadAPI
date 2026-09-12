const productoraService = require('../services/productoraService');
const asyncHandler = require('../utils/asyncHandler');

const getAllProductoras = asyncHandler(async (req, res) => {
  const productoras = await productoraService.getAllProductoras();
  res.status(200).json(productoras);
});

const getProductoraById = asyncHandler(async (req, res) => {
  const productora = await productoraService.getProductoraById(req.params.id);
  res.status(200).json(productora);
});

const createProductora = asyncHandler(async (req, res) => {
  const productora = await productoraService.createProductora(req.body);
  res.status(201).json(productora);
});

const updateProductora = asyncHandler(async (req, res) => {
  const productora = await productoraService.updateProductora(req.params.id, req.body);
  res.status(200).json(productora);
});

const deleteProductora = asyncHandler(async (req, res) => {
  await productoraService.deleteProductora(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAllProductoras,
  getProductoraById,
  createProductora,
  updateProductora,
  deleteProductora,
};
