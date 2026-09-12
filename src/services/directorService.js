const directorRepository = require('../repositories/directorRepository');
const AppError = require('../utils/AppError');

async function getAllDirectores() {
  return directorRepository.getAll();
}

async function getDirectorById(id) {
  const director = await directorRepository.getById(id);
  if (!director) {
    throw new AppError(404, 'Director no encontrado');
  }
  return director;
}

async function createDirector(data) {
  const nombres = data.nombres?.trim();
  if (!nombres) {
    throw new AppError(400, 'Los nombres del director son obligatorios');
  }

  return directorRepository.create({
    ...data,
    nombres,
  });
}

async function updateDirector(id, data) {
  const director = await directorRepository.getById(id);
  if (!director) {
    throw new AppError(404, 'Director no encontrado');
  }

  if (data.nombres !== undefined) {
    const nombres = data.nombres?.trim();
    if (!nombres) {
      throw new AppError(400, 'Los nombres del director no pueden estar vacíos');
    }
    data.nombres = nombres;
  }

  const directorActualizado = await directorRepository.updateById(id, data);
  return directorActualizado;
}

async function deleteDirector(id) {
  const director = await directorRepository.getById(id);
  if (!director) {
    throw new AppError(404, 'Director no encontrado');
  }

  await directorRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllDirectores,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
};
