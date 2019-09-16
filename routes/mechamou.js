const express = require('express');
const router = express.Router();

const index = require('./../controllers/meChamouController');

router.get('/', index.home);

module.exports = router;