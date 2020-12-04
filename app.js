const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const express = require('express')
const methodOverride = require('method-override')
const app = express();

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

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

// INDEX
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

// SHOW
app.get('/movies/:id', (req, res) => {
  models.Movie.findByPk(req.params.id).then((movie) => {
    res.render('movies-show', { movie: movie })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/movies/:id/edit', (req, res) => {
  models.Movie.findByPk(req.params.id).then((movie) => {
    res.render('movies-edit', { movie: movie });
  }).catch((err) => {
    console.log(err.message);
  })
});

// UPDATE
app.put('/movies/:id', (req, res) => {
  models.Movie.findByPk(req.params.id).then(movie => {
    movie.update(req.body).then(movie => {
      res.redirect(`/movies/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
