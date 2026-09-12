const mediaService = require('../services/mediaService');
const asyncHandler = require('../utils/asyncHandler');

const getAllMedias = asyncHandler(async (req, res) => {
  const medias = await mediaService.getAllMedias();
  res.status(200).json(medias);
});

const getMediaById = asyncHandler(async (req, res) => {
  const media = await mediaService.getMediaById(req.params.id);
  res.status(200).json(media);
});

const createMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.createMedia(req.body);
  res.status(201).json(media);
});

const updateMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.updateMedia(req.params.id, req.body);
  res.status(200).json(media);
});

const deleteMedia = asyncHandler(async (req, res) => {
  await mediaService.deleteMedia(req.params.id);
  res.status(204).send();
});

module.exports = {
  getAllMedias,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
