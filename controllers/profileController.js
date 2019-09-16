const Profile = require('./../models/Profile');
const User = require('./../models/User');



exports.getProfiles = async(req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.status(200).render('profile/profiles', {
           profiles
       })
  } catch (err) {
   res.status(500).json(err.response);
  }
} 

exports.getProfileId = async(req, res) => { 
  try {
    const profile = await Profile.findOne({ _id: req.params.prof_id }).populate('user', ['name', 'avatar']);
    console.log(profile)
    res.status(200).render('profile/profile', {
      profile
    });
  } catch (err) {
    res.status(500).json(err.response);  
  }
}  