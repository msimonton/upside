const express = require('express');
const router = express.Router();
const Users = require('../models/users');


// router.use((req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect('/');
//   }
// });

function myAccountRequired(req, res, next) {
  if (req.session.user.id.toString() === req.params.id) {
    next();
  } else {
    res.redirect('/login');
  }
}




router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  Users.authenticateUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      res.render('login.hbs', {error: err});
    } else {
      req.session.user = user;
      console.log(req.session);
      res.render('admin.hbs');
    }
  });
});






module.exports = router;
