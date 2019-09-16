const express = require('express');
const router = express.Router();

const profilesController = require('./../controllers/profileController');

router.get('/', profilesController.getProfiles);
router.get('/user/:prof_id', profilesController.getProfileId); 

module.exports = router;