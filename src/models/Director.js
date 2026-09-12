const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: [true, 'Los nombres del director son obligatorios'],
      trim: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
      required: true,
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

directorSchema.pre('save', function () {
  this.fechaActualizacion = new Date();
});

directorSchema.pre(['findOneAndUpdate', 'updateOne'], function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Director', directorSchema, 'directores');
