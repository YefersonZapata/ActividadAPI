const Media = require('../models/Media');

async function getAll() {
  return Media.find()
    .populate('generoId')
    .populate('directorId')
    .populate('productoraId')
    .populate('tipoId')
    .sort({ titulo: 1 });
}

async function getById(id) {
  return Media.findById(id)
    .populate('generoId')
    .populate('directorId')
    .populate('productoraId')
    .populate('tipoId');
}

async function create(data) {
  return Media.create(data);
}

async function updateById(id, data) {
  return Media.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate('generoId').populate('directorId').populate('productoraId').populate('tipoId');
}

async function remove(id) {
  return Media.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, updateById, remove };
