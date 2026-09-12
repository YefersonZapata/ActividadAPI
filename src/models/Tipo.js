const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del tipo es obligatorio'],
      trim: true,
      unique: true,
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

tipoSchema.pre('save', function () {
  this.fechaActualizacion = new Date();
});

tipoSchema.pre(['findOneAndUpdate', 'updateOne'], function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Tipo', tipoSchema, 'tipos');
