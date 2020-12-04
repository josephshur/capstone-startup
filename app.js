const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const express = require('express')
const methodOverride = require('method-override')
const app = express();

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
//const moment = require('moment');

const models = require('./db/models');

app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// Mock array
var movies = [
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

require('./controllers/movies')(app, models);
require('./controllers/ratings')(app, models);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
