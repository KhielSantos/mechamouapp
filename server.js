const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport')
const mongoose = require('mongoose');
const connectDB = require('./config/db');


const app = express();

const profiles = require('./routes/profile');
const users = require('./routes/user');

require('./config/passport')(passport);

mongoose.Promise = global.Promise;
connectDB();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) =>{
  res.status(200).render('index/home');
})

app.use('/profiles', profiles);
app.use('/users', users);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Aplicacao rodando na porta ${port}`)
}) 