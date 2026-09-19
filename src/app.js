const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API funcionando correctamente',
    endpoints: [
      '/api',
      '/api/health',
      '/api/generos',
      '/api/directores',
      '/api/productoras',
      '/api/tipos',
      '/api/medias',
    ],
  });
});

app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
