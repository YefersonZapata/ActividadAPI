const express = require('express');
const router = express.Router();

const generosRoutes = require('./generos');
const directoresRoutes = require('./directores');
const productorasRoutes = require('./productoras');
const tiposRoutes = require('./tipos');
const mediasRoutes = require('./medias');

router.get('/health', (req, res) => {
  res.json({ ok: true, message: 'API funcionando correctamente' });
});

router.use('/generos', generosRoutes);
router.use('/directores', directoresRoutes);
router.use('/productoras', productorasRoutes);
router.use('/tipos', tiposRoutes);
router.use('/medias', mediasRoutes);

module.exports = router;
