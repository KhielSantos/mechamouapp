const bcrypt = require('bcryptjs');
const passport = require('passport');


const User = require('./../models/User');


exports.getLogin =  (req, res) => {

  res.status(200).render('users/login'); 
}

exports.getRegister = (req, res) => {
  res.status(200).render('users/register');
}

exports.login =  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/profiles/profile/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}

exports.createUser = (req, res) => {
  const {name, email, password, password2 } = req.body;
  let errors = [];

  if(password !== password2) {
    errors.push({text: 'As senhas são diferente'})
  }

  if(password.length < 6){
    errors.push({text:'Senha tem que possuir mais de 6 caracteres'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email já registrado');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Agora você está registrado e pode fazer login');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
}


exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'Você está desconectado');
  res.redirect('/users/login');
}
