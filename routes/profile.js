const express = require('express');
const router = express.Router();

const profilesController = require('./../controllers/profileController');

router.get('/', profilesController.getProfiles);
router.get('/user/:prof_id', profilesController.getProfileId);
router.get('/profile/:id', profilesController.getUserDashboard);
router.get('/create/profile', profilesController.getCreateProfile);
router.post('/create/profile', profilesController.postCreateProfile);

module.exports = router;