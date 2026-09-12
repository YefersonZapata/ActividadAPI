const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/', generoController.getAllGeneros);
router.get('/:id', generoController.getGeneroById);
router.post('/', generoController.createGenero);
router.put('/:id', generoController.updateGenero);
router.delete('/:id', generoController.deleteGenero);

module.exports = router;
