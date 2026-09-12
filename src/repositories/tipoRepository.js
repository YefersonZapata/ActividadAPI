const Tipo = require('../models/Tipo');

async function getAll() {
  return Tipo.find().sort({ nombre: 1 });
}

async function getById(id) {
  return Tipo.findById(id);
}

async function create(data) {
  return Tipo.create(data);
}

async function updateById(id, data) {
  return Tipo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return Tipo.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, updateById, remove };
