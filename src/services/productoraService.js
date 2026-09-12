const productoraRepository = require('../repositories/productoraRepository');
const AppError = require('../utils/AppError');

async function getAllProductoras() {
  return productoraRepository.getAll();
}

async function getProductoraById(id) {
  const productora = await productoraRepository.getById(id);
  if (!productora) {
    throw new AppError(404, 'Productora no encontrada');
  }
  return productora;
}

async function createProductora(data) {
  const nombre = data.nombre?.trim();
  if (!nombre) {
    throw new AppError(400, 'El nombre de la productora es obligatorio');
  }

  return productoraRepository.create({
    ...data,
    nombre,
    slogan: data.slogan?.trim() || '',
    descripcion: data.descripcion?.trim() || '',
  });
}

async function updateProductora(id, data) {
  const productora = await productoraRepository.getById(id);
  if (!productora) {
    throw new AppError(404, 'Productora no encontrada');
  }

  if (data.nombre !== undefined) {
    const nombre = data.nombre?.trim();
    if (!nombre) {
      throw new AppError(400, 'El nombre de la productora no puede estar vacío');
    }
    data.nombre = nombre;
  }

  if (data.slogan !== undefined) {
    data.slogan = data.slogan?.trim() || '';
  }

  if (data.descripcion !== undefined) {
    data.descripcion = data.descripcion?.trim() || '';
  }

  const productoraActualizada = await productoraRepository.updateById(id, data);
  return productoraActualizada;
}

async function deleteProductora(id) {
  const productora = await productoraRepository.getById(id);
  if (!productora) {
    throw new AppError(404, 'Productora no encontrada');
  }

  await productoraRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllProductoras,
  getProductoraById,
  createProductora,
  updateProductora,
  deleteProductora,
};
