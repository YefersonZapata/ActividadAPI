const mongoose = require('mongoose');

const productoraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la productora es obligatorio'],
      trim: true,
      unique: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Activo',
      required: true,
    },
    slogan: {
      type: String,
      trim: true,
      default: '',
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

productoraSchema.pre('save', function () {
  this.fechaActualizacion = new Date();
});

productoraSchema.pre(['findOneAndUpdate', 'updateOne'], function () {
  this.set({ fechaActualizacion: new Date() });
});

module.exports = mongoose.model('Productora', productoraSchema, 'productoras');
