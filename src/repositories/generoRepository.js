const Genero = require('../models/Genero');

async function getAll() {
  return Genero.find().sort({ nombre: 1 });
}

async function getById(id) {
  return Genero.findById(id);
}

async function create(data) {
  return Genero.create(data);
}

async function updateById(id, data) {
  return Genero.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return Genero.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, updateById, remove };
