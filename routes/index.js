var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


function Messages() {
  return knex('messages');
}

/* GET home page. */

// router.get('/admin', function(req, res, next) {
//   res.render('/admin', { title: 'Express' });
// });


router.get('/admin', function(req, res, next) {
  Messages().select().then(function (records) {
    res.render('admin.hbs', {allMessages: records});
  });
});

router.post('/messages', function(req, res, next) {
  Messages().insert({email: req.body.email,
                    subject: req.body.subject,
                    phoneNumber: req.body.phoneNumber,
                    message: req.body.message
     }).then(function () {
    res.redirect('/');
  });
});



module.exports = router;
