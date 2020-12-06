// controllers/ratings.js

module.exports = async function (app, models) {


  // NEW
  app.get('/movies/:movieId/ratings/new', (req, res) => {
    models.Movie.findByPk(req.params.movieId).then(movie => {
      res.render('ratings-new', { movie: movie });
    });
  });

  // CREATE
  app.post('/movies/:movieId/ratings', (req, res) => {
    req.body.MovieId = req.params.movieId;
    models.Rating.create(req.body).then(rating => {
      console.log(req.params);
      res.redirect(`/movies/${req.params.movieId}`);
    }).catch((err) => {
        console.log(err)
    });
  });

  // DELETE
  app.delete('/movies/:movieId/ratings/:id', (req, res) => {
      models.Rating.findByPk(req.params.id).then(rating => {
          rating.destroy();
          res.redirect(`/movies/${req.params.movieId}`);
      }).catch((err) => {
          console.log(err);
      });
  });
}
