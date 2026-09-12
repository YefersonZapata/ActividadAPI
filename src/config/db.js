const mongoose = require('mongoose');

const uri = 'mongodb+srv://YEFERSON:QaA8v-M3XY2VKQ_@cluster0.5nsdzuo.mongodb.net/iu_digital_media?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
//og
