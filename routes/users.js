const express = require('express');
const router = express.Router();
const Users = require('../models/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Users().select().then(users => {
    res.render('users/index', {users: users});
  });
});

router.get('/new', (req, res, next) => {
  res.render('users/new');
});

router.post('/', (req, res, next) => {
  Users.createUser(req.body, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
