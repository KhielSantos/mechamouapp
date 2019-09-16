const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const meChamou = require('./routes/meChamou');

const app = express();

connectDB();


app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', meChamou);


const port = 5000;

app.listen(port, () => {
  console.log(`Aplicacao rodando na porta ${port}`)
})