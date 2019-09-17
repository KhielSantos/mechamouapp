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

exports.getEditProfileId = async(req, res) => { 
  try {
    const profile = await Profile.findOne({ _id: req.params.prof_id }).populate('user', ['name', 'avatar']);
    res.status(200).render('profileForm/editProfile', {
      profile
    });
  } catch (err) {
    res.status(500).json(err.response);  
  }
}

exports.getUserDashboard = async(req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).select('-password').populate('user', ['name', 'avatar']);
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

exports.getCreateEducation = async (req, res) => {
  res.status(200).render('profileForm/createEducation');
}

exports.getCreateExperience = async (req, res) => {
  res.status(200).render('profileForm/createExperience');
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

exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    req.flash('success_msg', 'Sua conta foi deletada com sucesso!!!');
    res.redirect('/users/register');
  } catch (err) {
    req.flash('error_msg', 'Não conseguimos realizar a exclusão!!!');
    res.redirect('/profiles/create/dashboard');
  }
}

exports.createExperience = async (req, res) => {

  console.log(req.body)
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  console.log(req.body)

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    res.status(200).render('dashboard/dashboard', {
      profile
    });
  } catch (err) {
    req.flash('error_msg', 'Não conseguimos realizar inclussão de dados!!!');
    res.redirect('/profiles/create/dashboard');
  }
}

exports.deleteExperience = async(req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.user.id });
    const expIds = profile.experience.map(exp => exp._id.toString());
    const removeIndex = expIds.indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.status(200).render('dashboard/dashboard', {
        profile
      });
    }
  } catch (error) {
    req.flash('error_msg', 'Não conseguimos realizar inclussão de dados!!!');
    res.redirect('/profiles/create/dashboard');

  }
}


exports.createEducation = async(req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.status(200).render('dashboard/dashboard', {
      profile
    });
  } catch (err) {
    req.flash('error_msg', 'Não conseguimos realizar inclussão de dados!!!');
    res.redirect('/profiles/create/dashboard');
  }
}

exports.deleteEducation = async(req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const eduIds = profile.education.map(edu => edu._id.toString());
    const removeIndex = eduIds.indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: "Server error" });
    } else {
      profile.education.splice(removeIndex, 1,);
      await profile.save();
      res.status(200).render('dashboard/dashboard', {
        profile
      });
    }
  } catch (error) {
    req.flash('error_msg', 'Não conseguimos realizar inclussão de dados!!!');
    res.redirect('/profiles/create/dashboard');
  }
}

exports.updateProfile = async (req, res) => {

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
    let profile = await Profile.findByIdAndUpdate(req.params.id, profileFields,
      { new: true, runValidators: true}
    );
    res.status(200).render('dashboard/dashboard', {
      profile
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}
