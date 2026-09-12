const Productora = require('../models/Productora');

async function getAll() {
  return Productora.find().sort({ nombre: 1 });
}

async function getById(id) {
  return Productora.findById(id);
}

async function create(data) {
  return Productora.create(data);
}

async function updateById(id, data) {
  return Productora.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return Productora.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, updateById, remove };
