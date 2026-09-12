const Director = require('../models/Director');

async function getAll() {
  return Director.find().sort({ nombres: 1 });
}

async function getById(id) {
  return Director.findById(id);
}

async function create(data) {
  return Director.create(data);
}

async function updateById(id, data) {
  return Director.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function remove(id) {
  return Director.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, updateById, remove };
