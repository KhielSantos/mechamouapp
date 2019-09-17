const express = require('express');
const router = express.Router();

const profilesController = require('./../controllers/profileController');
const auth = require('./../helpers/auth')

router.get('/', profilesController.getProfiles);
router.get('/user/:prof_id', profilesController.getProfileId);
router.get('/profile/dashboard', auth.ensureAuthenticated, profilesController.getUserDashboard);
router.get('/create/profile', auth.ensureAuthenticated, profilesController.getCreateProfile);
router.post('/create/profile', auth.ensureAuthenticated, profilesController.postCreateProfile);

module.exports = router;