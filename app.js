console.log("here")
const express = require('express');
console.log("here")
const path = require('path');
console.log("here")
const bodyParser = require('body-parser');
console.log("here")
const exphbs = require('express-handlebars');
console.log("here")
const expressValidator = require('express-validator');
console.log("here")
const flash = require('connect-flash');
console.log("here")
const session = require('express-session');
console.log("here")
const passport = require('passport');
console.log("here")
const mongoose = require('mongoose');
console.log("here2") ;
const app = express();

const port = process.env.PORT || 3000;

const index = require('./routes/index');

// View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    maxAge: null,
    cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}));


// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Express messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', index);


// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
