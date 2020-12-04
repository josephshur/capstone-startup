//movies.js

module.exports = function (app, models) {

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
    models.Movie.findByPk(req.params.id, { include: [{ model: models.Rating }] }).then((movie) => {
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

  // DELETE
  app.delete('/movies/:id', (req, res) => {
    models.Movie.findByPk(req.params.id).then(movie => {
      movie.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })
}