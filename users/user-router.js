const router = require('express').Router();

const authMiddle = require('../auth/auth-middleware');
const Users = require('./user-model.js');

router.get('/', authMiddle, (req, res) => {
   Users.find()
      .then(users => {
         res.json(users);
      })
      .catch(err => res.send(err));
});

module.exports = router;
