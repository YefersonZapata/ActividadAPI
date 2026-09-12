const generoRepository = require('../repositories/generoRepository');
const AppError = require('../utils/AppError');

async function getAllGeneros() {
  return generoRepository.getAll();
}

async function getGeneroById(id) {
  const genero = await generoRepository.getById(id);
  if (!genero) {
    throw new AppError(404, 'Género no encontrado');
  }
  return genero;
}

async function createGenero(data) {
  const nombre = data.nombre?.trim();
  if (!nombre) {
    throw new AppError(400, 'El nombre del género es obligatorio');
  }

  const genero = await generoRepository.create({
    ...data,
    nombre,
    descripcion: data.descripcion?.trim() || '',
  });

  return genero;
}

async function updateGenero(id, data) {
  const genero = await generoRepository.getById(id);
  if (!genero) {
    throw new AppError(404, 'Género no encontrado');
  }

  if (data.nombre !== undefined) {
    const nombre = data.nombre?.trim();
    if (!nombre) {
      throw new AppError(400, 'El nombre del género no puede estar vacío');
    }
    data.nombre = nombre;
  }

  if (data.descripcion !== undefined) {
    data.descripcion = data.descripcion?.trim() || '';
  }

  const generoActualizado = await generoRepository.updateById(id, data);
  return generoActualizado;
}

async function deleteGenero(id) {
  const genero = await generoRepository.getById(id);
  if (!genero) {
    throw new AppError(404, 'Género no encontrado');
  }

  await generoRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllGeneros,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
};
