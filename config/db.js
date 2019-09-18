const mongoose = require('mongoose');
const db = require('./database');

const connectDB = async () => {
  try {
    await mongoose.connect(db.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    }).then(() => console.log('DB connect...'));
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;