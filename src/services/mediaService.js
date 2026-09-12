const mongoose = require('mongoose');
const mediaRepository = require('../repositories/mediaRepository');
const generoRepository = require('../repositories/generoRepository');
const directorRepository = require('../repositories/directorRepository');
const productoraRepository = require('../repositories/productoraRepository');
const tipoRepository = require('../repositories/tipoRepository');
const AppError = require('../utils/AppError');

async function validarRelacionActiva({ generoId, directorId, productoraId }) {
  if (generoId) {
    const genero = await generoRepository.getById(generoId);
    if (!genero) {
      throw new AppError(400, 'El género asociado no existe');
    }
    if (genero.estado !== 'Activo') {
      throw new AppError(400, 'El género asociado debe estar activo');
    }
  }

  if (directorId) {
    const director = await directorRepository.getById(directorId);
    if (!director) {
      throw new AppError(400, 'El director asociado no existe');
    }
    if (director.estado !== 'Activo') {
      throw new AppError(400, 'El director asociado debe estar activo');
    }
  }

  if (productoraId) {
    const productora = await productoraRepository.getById(productoraId);
    if (!productora) {
      throw new AppError(400, 'La productora asociada no existe');
    }
    if (productora.estado !== 'Activo') {
      throw new AppError(400, 'La productora asociada debe estar activa');
    }
  }
}

async function validarTipoExiste(tipoId) {
  if (!tipoId) return;

  const tipo = await tipoRepository.getById(tipoId);
  if (!tipo) {
    throw new AppError(400, 'El tipo asociado no existe');
  }
}

async function validarSerialYUrlUnicos(serial, urlPelicula, excludeId = null) {
  const query = {
    $or: [
      { serial: serial?.trim() },
      { urlPelicula: urlPelicula?.trim() },
    ],
  };

  if (excludeId) {
    query._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
  }

  const existente = await mediaRepository.getAll().then((medias) => {
    return medias.find((m) => {
      const mismoSerial = m.serial?.trim() === serial?.trim();
      const mismaUrl = m.urlPelicula?.trim() === urlPelicula?.trim();
      return mismoSerial || mismaUrl;
    });
  });

  if (existente) {
    if (existente.serial?.trim() === serial?.trim() && existente._id.toString() !== excludeId) {
      throw new AppError(409, 'El serial ya existe');
    }
    if (existente.urlPelicula?.trim() === urlPelicula?.trim() && existente._id.toString() !== excludeId) {
      throw new AppError(409, 'La URL de la película ya existe');
    }
  }
}

async function getAllMedias() {
  return mediaRepository.getAll();
}

async function getMediaById(id) {
  const media = await mediaRepository.getById(id);
  if (!media) {
    throw new AppError(404, 'Media no encontrada');
  }
  return media;
}

async function createMedia(data) {
  const serial = data.serial?.trim();
  const titulo = data.titulo?.trim();
  const urlPelicula = data.urlPelicula?.trim();

  if (!serial) throw new AppError(400, 'El serial es obligatorio');
  if (!titulo) throw new AppError(400, 'El título es obligatorio');
  if (!urlPelicula) throw new AppError(400, 'La URL de la película es obligatoria');

  await validarRelacionActiva({
    generoId: data.generoId,
    directorId: data.directorId,
    productoraId: data.productoraId,
  });
  await validarTipoExiste(data.tipoId);
  await validarSerialYUrlUnicos(serial, urlPelicula);

  return mediaRepository.create({
    ...data,
    serial,
    titulo,
    urlPelicula,
    sinopsis: data.sinopsis?.trim() || '',
    imagenPortada: data.imagenPortada?.trim() || '',
  });
}

async function updateMedia(id, data) {
  const mediaExistente = await mediaRepository.getById(id);
  if (!mediaExistente) {
    throw new AppError(404, 'Media no encontrada');
  }

  const serial = data.serial ?? mediaExistente.serial;
  const titulo = data.titulo ?? mediaExistente.titulo;
  const urlPelicula = data.urlPelicula ?? mediaExistente.urlPelicula;

  if (!serial?.trim()) throw new AppError(400, 'El serial es obligatorio');
  if (!titulo?.trim()) throw new AppError(400, 'El título es obligatorio');
  if (!urlPelicula?.trim()) throw new AppError(400, 'La URL de la película es obligatoria');

  await validarRelacionActiva({
    generoId: data.generoId || mediaExistente.generoId,
    directorId: data.directorId || mediaExistente.directorId,
    productoraId: data.productoraId || mediaExistente.productoraId,
  });
  await validarTipoExiste(data.tipoId || mediaExistente.tipoId);
  await validarSerialYUrlUnicos(serial, urlPelicula, id);

  if (data.serial !== undefined) data.serial = data.serial.trim();
  if (data.titulo !== undefined) data.titulo = data.titulo.trim();
  if (data.urlPelicula !== undefined) data.urlPelicula = data.urlPelicula.trim();
  if (data.sinopsis !== undefined) data.sinopsis = data.sinopsis?.trim() || '';
  if (data.imagenPortada !== undefined) data.imagenPortada = data.imagenPortada?.trim() || '';

  const mediaActualizada = await mediaRepository.updateById(id, data);
  return mediaActualizada;
}

async function deleteMedia(id) {
  const media = await mediaRepository.getById(id);
  if (!media) {
    throw new AppError(404, 'Media no encontrada');
  }

  await mediaRepository.remove(id);
  return { deleted: true };
}

module.exports = {
  getAllMedias,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
