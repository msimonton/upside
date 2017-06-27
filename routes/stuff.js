const express = require('express');
const router = express.Router();
router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
});

router.get('/:id/regularStuff', (req, res, next) => {
  res.render('users/regularStuff')
});

router.get('/:id/admin', (req, res, next) => {
  res.render('admin')
});

function myAccountRequired(req, res, next) {
  if (req.session.user.id.toString() === req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = router;
