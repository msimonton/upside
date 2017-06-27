const express = require('express');
const router = express.Router();
const Users = require('../models/admin');


router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
});

function myAccountRequired(req, res, next) {
  if (req.session.user.id.toString() === req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  Users().select().then(users => {
    res.render('users/index', {users: users});
  });
});

router.get('/new', (req, res, next) => {
  res.render('users/new');
});

router.post('/users', (req, res, next) => {
  Users.createUser(req.body, (err, data) => {
    res.send(data);
  });
});







router.get('/signin', (req, res, next) => {
  res.render('auth/signin.ejs');
});

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/signin', (req, res, next) => {
  Users.authenticateUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      res.render('auth/signin.ejs', {error: err});
    } else {
      req.session.user = user;
      console.log(req.session);
      res.redirect('/admin.hbs');
    }
  });
});





router.post('/', (req, res, next) => {
  Users.createUser(req.body, (err, data) => {
    res.send(data);
  });
});



module.exports = router;
