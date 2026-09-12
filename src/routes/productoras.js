const express = require('express');
const router = express.Router();
const productoraController = require('../controllers/productoraController');

router.get('/', productoraController.getAllProductoras);
router.get('/:id', productoraController.getProductoraById);
router.post('/', productoraController.createProductora);
router.put('/:id', productoraController.updateProductora);
router.delete('/:id', productoraController.deleteProductora);

module.exports = router;
