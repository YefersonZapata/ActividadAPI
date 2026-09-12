const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

router.get('/', directorController.getAllDirectores);
router.get('/:id', directorController.getDirectorById);
router.post('/', directorController.createDirector);
router.put('/:id', directorController.updateDirector);
router.delete('/:id', directorController.deleteDirector);

module.exports = router;
