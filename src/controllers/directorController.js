const directorService = require('../services/directorService');
const asyncHandler = require('../utils/asyncHandler');

const getAllDirectores = asyncHandler(async (req, res) => {
  const directores = await directorService.getAllDirectores();
  res.status(200).json(directores);
});

const getDirectorById = asyncHandler(async (req, res) => {
  const director = await directorService.getDirectorById(req.params.id);
  res.status(200).json(director);
});

const createDirector = asyncHandler(async (req, res) => {
  const director = await directorService.createDirector(req.body);
  res.status(201).json(director);
});

const updateDirector = asyncHandler(async (req, res) => {
  const director = await directorService.updateDirector(req.params.id, req.body);
  res.status(200).json(director);
});

const deleteDirector = asyncHandler(async (req, res) => {
  await directorService.deleteDirector(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAllDirectores,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
};
