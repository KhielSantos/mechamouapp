const express = require('express');
const router = express.Router();

const meChamouController = require('./../controllers/meChamouController');

router.get('/', meChamouController.getHome);

module.exports = router;