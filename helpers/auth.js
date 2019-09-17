module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Você não tem autorização para está pagina');
    res.redirect('/users/login');
  }
}