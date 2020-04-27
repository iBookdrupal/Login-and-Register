const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//* Passport config
require('./config/passport')(passport);

const app = express();

/*
//* DB Config
const db = require('./config/keys').url;

//* Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

  
*/

const url = 'mongodb://localhost/passportAuthLogin';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//* EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static('public'));

//* Bodyparser
app.use(express.urlencoded({extended: false}));

//* Express session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//* Connect flash
app.use(flash());

//* Global variables - middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//* Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
