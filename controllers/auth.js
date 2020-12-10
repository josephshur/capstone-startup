//auth.js

const jwt = require('jsonwebtoken');

function generateJWT(user) {
  const csJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

  return csJWT
};

module.exports = function (app, models) {

    // SIGN-UP
    app.get('/sign-up', (req, res) => {
      res.render('sign-up', { });
    })

    // LOGIN
    app.get('/login', (req, res) => {
      res.render('login', { });
    })

    // POST SIGN-UP
    app.post('/sign-up', (req, res) => {
      models.User.create(req.body).then(user => {
        // after creating the user
        const csJWT = generateJWT(user);
        
        console.log("Req.Body:", req.body);
        // // save as cookie
        res.cookie("csJWT", csJWT);

        // // redirect to the root route
        res.redirect('/');
        //console.log(req.body);
      }).catch((err) => {
        console.log(err)
      });
    })

    //POST LOGIN
    app.post('/login', (req, res, next) => {
      models.User.findOne({ where: { username: req.body.username } }).then(user => {
        // compare passwords
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) {
            console.log(err);
          }
          // if not match send back to login
          if (!isMatch) {
            return res.redirect('/login');
          } else {
          // if is match generate JWT
          const csJWT = generateJWT(user);
          // save jwt as cookie
          res.cookie("csJWT", csJWT)
          res.redirect('/')
          }
        })
      }).catch(err => {
        // if  can't find user return to login
        console.log(err);
        return res.redirect('/login');
      });
    });

    // ME
    app.get('/me', (req, res) => {
      models.Movie.findAll({ order: [['createdAt', 'DESC']], where: { UserId: req.user.id } }).then(movies => {
        res.render('me', { movies: movies });
      })
    })

    // MY MOVIES
    app.get('/me/movies', (req, res) => {
      models.Movie.findAll({ order: [['createdAt', 'DESC']], where: { UserId: req.user.id } }).then(movies => {
        res.render('me-movies', { movies: movies });
      })
    })

    // MY ARTICLES
    app.get('/me/articles', (req, res) => {
      models.Article.findAll({ order: [['createdAt', 'DESC']], where: { UserId: req.user.id } }).then(articles => {
        res.render('me-articles', { articles: articles });
      })
    })

    // MY RATINGS
    app.get('/me/ratings', (req, res) => {
      models.Rating.findAll({ order: [['createdAt', 'DESC']], where: { UserId: req.user.id } }).then(ratings => {
        res.render('me-ratings', { ratings: ratings });
      })
    })

    // LOGOUT
    app.get('/logout', (req, res, next) => {
      res.clearCookie('csJWT');

      //req.session.sessionFlash = { type: 'success', message: 'Successfully logged out!' }
      return res.redirect('/');
    });

    // USER INDEX
    app.get('/users', (req, res) => {
      models.User.findAll({ order: [['createdAt', 'DESC']] }).then(users => {
        res.render('users-index', { users: users });
      })
    })
}
