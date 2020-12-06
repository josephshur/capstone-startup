const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const express = require('express')
const methodOverride = require('method-override')
const app = express();

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const jwtExpress = require('express-jwt');
const jwt = require('jsonwebtoken');
//const moment = require('moment');

const models = require('./db/models');
const cookieParser = require('cookie-parser');

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Mock array
var movies = [
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

app.use(function authenticateToken(req, res, next) {
  const token = req.cookies.csJWT;

  if (token) {
    jwt.verify(token, "AUTH-SECRET", (err, user) => {
      console.log(err);
      if (err) res.redirect('/');
      req.user = user;
      next()
    })
  } else {
    next()
  }
});

app.use(function (req, res, next) {
  console.log("lookingUpUser:", req.user);
  if (req.user) {
    console.log("Req.User:", req.user);
    models.User.findByPk(req.user.id).then(currentUser => {
      console.log("currentUser:", currentUser);
      res.locals.currentUser = currentUser;
      next();
    }).catch(err => {
      console.log(err);
    })
  } else {
    next();
  }
});

require('./controllers/auth')(app, models);
require('./controllers/movies')(app, models);
require('./controllers/ratings')(app, models);
require('./controllers/articles')(app, models);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
