const express = require('express');
const LevelController = require('../controllers/LevelController');

const router = express.Router();

router.post('/', LevelController.createLevel);
router.get('/', LevelController.getLevels);
router.put('/:id', LevelController.updateLevel);
router.delete('/:id', LevelController.deleteLevel);

module.exports = router;
