const generoService = require('../services/generoService');
const asyncHandler = require('../utils/asyncHandler');

const getAllGeneros = asyncHandler(async (req, res) => {
  const generos = await generoService.getAllGeneros();
  res.status(200).json(generos);
});

const getGeneroById = asyncHandler(async (req, res) => {
  const genero = await generoService.getGeneroById(req.params.id);
  res.status(200).json(genero);
});

const createGenero = asyncHandler(async (req, res) => {
  const genero = await generoService.createGenero(req.body);
  res.status(201).json(genero);
});

const updateGenero = asyncHandler(async (req, res) => {
  const genero = await generoService.updateGenero(req.params.id, req.body);
  res.status(200).json(genero);
});

const deleteGenero = asyncHandler(async (req, res) => {
  await generoService.deleteGenero(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAllGeneros,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
};
