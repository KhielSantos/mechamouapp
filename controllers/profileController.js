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
    res.status(200).render('profile/profile', {
      profile
    });
  } catch (err) {
    res.status(500).json(err.response);  
  }
}

exports.getUserDashboard = async(req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.id}).select('-password').populate('user', ['name', 'avatar']);
    console.log(profile)
    res.status(200).render('dashboard/dashboard', {
      profile
    })
  } catch (err) {
    
  }
}

exports.getCreateProfile = async (req, res) => {
  res.status(200).render('profileForm/createProfile');
}
exports.postCreateProfile = async (req, res) => {

  const {
    cellphone,
    profession,
    description,
    cpf,
    skills,
    street,
    cep,
    num,
    neighborhood,
    city,
    stade,
    note,
    comment,
    terms,
    privacy,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (description) profileFields.description = description;
  if (profession) profileFields.profession = profession;
  if (cpf) profileFields.cpf = cpf;
  if (street) profileFields.street = street;
  if (cep) profileFields.cep = cep;
  if (num) profileFields.num = num;
  if (neighborhood) profileFields.neighborhood = neighborhood;
  if (city) profileFields.city = city;
  if (stade) profileFields.stade = stade;
  if (note) profileFields.note = note;
  if (terms) profileFields.terms = terms;
  if (comment) profileFields.comment = comment;
  if (privacy) profileFields.privacy = privacy;
  if (cellphone) {
    profileFields.cellphone = cellphone
      .split(',')
      .map(cellphone => cellphone.trim());
  }
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.status(200).render('dashboard/dashboard', {
      profile
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}