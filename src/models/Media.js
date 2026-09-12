const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: [true, 'El serial es obligatorio'],
      unique: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    sinopsis: {
      type: String,
      trim: true,
      default: '',
    },
    urlPelicula: {
      type: String,
      required: [true, 'La URL de la película es obligatoria'],
      unique: true,
      trim: true,
    },
    imagenPortada: {
      type: String,
      trim: true,
      default: '',
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    fechaActualizacion: {
      type: Date,
      default: Date.now,
    },
    anioEstreno: {
      type: Number,
      min: 1888,
      required: true,
    },
    generoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genero',
      required: true,
    },
    directorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
      required: true,
    },
    productoraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Productora',
      required: true,
    },
    tipoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tipo',
      required: true,
    },
  },
  { timestamps: false }
);

mediaSchema.pre('save', function () {
  this.fechaActualizacion = new Date();
});

mediaSchema.pre(['findOneAndUpdate', 'updateOne'], function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Media', mediaSchema, 'medias');
