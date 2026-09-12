const tipoRepository = require('../repositories/tipoRepository');
const AppError = require('../utils/AppError');

async function getAllTipos() {
  return tipoRepository.getAll();
}

async function getTipoById(id) {
  const tipo = await tipoRepository.getById(id);
  if (!tipo) {
    throw new AppError(404, 'Tipo no encontrado');
  }
  return tipo;
}

async function createTipo(data) {
  const nombre = data.nombre?.trim();
  if (!nombre) {
    throw new AppError(400, 'El nombre del tipo es obligatorio');
  }

  return tipoRepository.create({
    ...data,
    nombre,
    descripcion: data.descripcion?.trim() || '',
  });
}

async function updateTipo(id, data) {
  const tipo = await tipoRepository.getById(id);
  if (!tipo) {
    throw new AppError(404, 'Tipo no encontrado');
  }

  if (data.nombre !== undefined) {
    const nombre = data.nombre?.trim();
    if (!nombre) {
      throw new AppError(400, 'El nombre del tipo no puede estar vacío');
    }
    data.nombre = nombre;
  }

  if (data.descripcion !== undefined) {
    data.descripcion = data.descripcion?.trim() || '';
  }

  const tipoActualizado = await tipoRepository.updateById(id, data);
  return tipoActualizado;
}

async function deleteTipo(id) {
  const tipo = await tipoRepository.getById(id);
  if (!tipo) {
    throw new AppError(404, 'Tipo no encontrado');
  }

  await tipoRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
};
