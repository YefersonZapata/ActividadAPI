const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (!uri) {
      throw new Error('MONGODB_URI no está definida. Agrega la variable de entorno en tu hosting.');
    }

    await mongoose.connect(uri);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
