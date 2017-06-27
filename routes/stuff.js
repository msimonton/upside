const express = require('express');
const router = express.Router();
router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
});


// router.get('/admin', (req, res, next) => {
//
// });

function myAccountRequired(req, res, next) {
  if (req.session.user.id.toString() === req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = router;
