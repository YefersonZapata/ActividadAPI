const tipoService = require('../services/tipoService');
const asyncHandler = require('../utils/asyncHandler');

const getAllTipos = asyncHandler(async (req, res) => {
  const tipos = await tipoService.getAllTipos();
  res.status(200).json(tipos);
});

const getTipoById = asyncHandler(async (req, res) => {
  const tipo = await tipoService.getTipoById(req.params.id);
  res.status(200).json(tipo);
});

const createTipo = asyncHandler(async (req, res) => {
  const tipo = await tipoService.createTipo(req.body);
  res.status(201).json(tipo);
});

const updateTipo = asyncHandler(async (req, res) => {
  const tipo = await tipoService.updateTipo(req.params.id, req.body);
  res.status(200).json(tipo);
});

const deleteTipo = asyncHandler(async (req, res) => {
  await tipoService.deleteTipo(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
};
