const express = require('express');
const router = express.Router();

const profilesController = require('./../controllers/profileController');
const auth = require('./../helpers/auth')

router.get('/', profilesController.getProfiles);
router.get('/user/:prof_id', profilesController.getProfileId);
router.get('/profile/dashboard', auth.ensureAuthenticated, profilesController.getUserDashboard);
router.get('/profile/edit/:prof_id', auth.ensureAuthenticated, profilesController.getEditProfileId);
router.get('/create/profile', auth.ensureAuthenticated, profilesController.getCreateProfile);
router.post('/create/profile', auth.ensureAuthenticated, profilesController.postCreateProfile);
router.get('/create/education', auth.ensureAuthenticated, profilesController.getCreateEducation);
router.get('/create/experience', auth.ensureAuthenticated, profilesController.getCreateExperience);
router.put('/create/experience', auth.ensureAuthenticated, profilesController.createExperience);
router.put('/create/education', auth.ensureAuthenticated, profilesController.createEducation);
router.delete('/profile/delete', auth.ensureAuthenticated, profilesController.deleteProfile);
router.delete('/profile/experience/:exp_id', auth.ensureAuthenticated, profilesController.deleteExperience);
router.delete('/profile/education/:edu_id', auth.ensureAuthenticated, profilesController.deleteEducation);
router.patch('/profile/edit/:id', auth.ensureAuthenticated, profilesController.updateProfile);

module.exports = router;