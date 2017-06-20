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

router.get('/home', function(req, res, next) {
    res.redirect('/');
});

router.post('/messages', function(req, res, next) {
  Messages().insert({name: req.body.name,
                    email: req.body.email,
                    subject: req.body.subject,
                    topic: req.body.topic,
                    phoneNumber: req.body.phoneNumber,
                    message: req.body.message
     }).then(function () {
    res.redirect('/#/connect')
  });
});


function deleteMessage(messID){
  return knex('messages').where('id', messID)
  .del()
}


router.get('/:id/delete', function(req, res,next){
  deleteMessage(req.params.id)
  .then(function()  {
  res.redirect('back');
})
.catch((err) => {
  console.error('Error caught in deleting post from DB')
  next(err)
})
})



module.exports = router;
