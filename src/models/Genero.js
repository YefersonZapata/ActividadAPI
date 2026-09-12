const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del género es obligatorio'],
      trim: true,
      unique: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
      required: true,
    },
    descripcion: {
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
  },
  { timestamps: false }
);

generoSchema.pre('save', function () {
  this.fechaActualizacion = new Date();
});

generoSchema.pre(['findOneAndUpdate', 'updateOne'], function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Genero', generoSchema, 'generos');
