//comments.js

module.exports = function (app, models) {

  // NEW
  app.get('/articles/:articleId/comments/new', (req, res) => {
    models.Article.findByPk(req.params.articleId).then(article => {
      res.render('comments-new', { article: article });
    });
  });

  // CREATE
  app.post('/articles/:articleId/comments', (req, res) => {
    req.body.ArticleId = req.params.articleId;
    models.Comment.create(req.body).then(comment => {
      console.log(req.params);
      //currentUser.movieScore = currentUser.movieScore + 1;
      res.redirect(`/articles/${req.params.articleId}`);
    }).catch((err) => {
        console.log(err)
    });
  });

  // DELETE
  app.delete('/articles/:articleId/comments/:id', (req, res) => {
      models.Comment.findByPk(req.params.id).then(comment => {
          comment.destroy();
          res.redirect(`/articles/${req.params.commentId}`);
      }).catch((err) => {
          console.log(err);
      });
  });

}
