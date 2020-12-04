const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// Initialize express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// require handlebars
const exphbs = require('express-handlebars');

const models = require('./db/models');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// Mock array
var movies = [
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "Star Wars: Revenge of the Sith", desc: "As the Clone Wars draw to an end, the Sith secretly rise to power.", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// Mock array 2
// var comments = [
//   { title: "Abc", desc: "abc"},
//   { title: "Abc", desc: "abc"},
//   { title: "Abc", desc: "abc"}
// ]

// Index
app.get('/', (req, res) => {
  models.Movie.findAll({ order: [['createdAt', 'DESC']] }).then(movies => {
    res.render('movies-index', { movies: movies });
  })
})

// NEW
app.get('/movies/new', (req, res) => {
  res.render('movies-new');
})

// CREATE
app.post('/movies', (req, res) => {
  models.Movie.create(req.body).then(movie => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
