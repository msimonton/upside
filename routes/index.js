var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var moment = require('moment');
var nodemailer = require("nodemailer");


function Messages() {
  return knex('messages');
}

function dateFormat() {
  moment()
}


router.get('/admin', function(req, res, next) {
  Messages().select()
  .then(function (records) {
    res.render('admin.hbs', {allMessages: records,
    });
  });
});

router.get('/home', function(req, res, next) {
    res.redirect('/');
});

router.post('/messages', function(req, res, next) {
  Messages().insert({date_short: moment().format('ddd,  MMM Do'),
                    date_long: moment().format('ddd,  MMM Do h:ma'),
                    name: req.body.name,
                    email: req.body.email,
                    subject: req.body.subject,
                    topic: req.body.topic,
                    phoneNumber: req.body.phoneNumber,
                    message: req.body.message
     }).then(function() {

  var smtpTransport = nodemailer.createTransport({
     service: "Outlook",  // sets automatically host, port and connection security settings
     auth: {
         user: "masspm1021@outlook.com",
         pass: "Test12345"
     }
  });

  smtpTransport.sendMail({  //email options
     from: "masspm1021@outlook.com", // sender address.  Must be the same as authenticated user if using Gmail.
     to: "masspm1021@yahoo.com",
     replyTo: req.body.email, // receiver
     subject: req.body.topic +"| "+ req.body.subject, // subject
     text: req.body.message // body
  }, function(error, response){  //callback
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }

     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  })
 res.redirect('/#/connect')
})

})


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
