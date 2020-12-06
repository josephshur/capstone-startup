//articles.js

module.exports = function (app, models) {

  // ARTICLES INDEX
  app.get('/articles', (req, res) => {
    models.Article.findAll({ order: [['createdAt', 'DESC']] }).then(articles => {
      res.render('articles-index', { articles: articles });
    })
  })

  // NEW
  app.get('/articles/new', (req, res) => {
    res.render('articles-new');
  })

  // CREATE
  app.post('/articles', (req, res) => {
    models.Article.create(req.body).then(article => {
      console.log(req.params.title);
      res.redirect(`/articles`);
    }).catch((err) => {
      console.log(err)
    });
  })

  // SHOW
    app.get('/articles/:id', (req, res) => {
      models.Article.findByPk(req.params.id).then(article => {
        let createdAt = article.createdAt;
        //createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        article.createdAtFormatted = createdAt;
        res.render('articles-show', { article: article });
      }).catch((err) => {
        console.log(err.message);
      })
    });

  // EDIT
    app.get('/articles/:id/edit', (req, res) => {
      models.Article.findByPk(req.params.id).then((article) => {
        res.render('articles-edit', { article: article });
      }).catch((err) => {
        console.log(err.message);
      })
    });

    // UPDATE
    app.put('/articles/:id', (req, res) => {
      models.Article.findByPk(req.params.id).then(article => {
        article.update(req.body).then(article => {
          res.redirect(`/articles/${req.params.id}`);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });

    // DELETE
    app.delete('/articles/:id', (req, res) => {
      models.Article.findByPk(req.params.id).then(article => {
        article.destroy();
        res.redirect(`/`);
      }).catch((err) => {
        console.log(err);
      });
    })

}
