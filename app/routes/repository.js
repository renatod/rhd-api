const express = require('express');
const repositoryController = require('../controllers/repository');

const router = express.Router();

router.get('/', repositoryController.getRepositories);
router.get('/:id', repositoryController.getRepository);

module.exports = router;
