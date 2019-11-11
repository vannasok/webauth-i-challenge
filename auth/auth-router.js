const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
   const userAcc = req.body;
   const hashPW = bcrypt.hashSync(userAcc.password, 10);
   userAcc.password = hashPW;

   Users.add(userAcc)
      .then(saved => {
         res.status(201).json(saved);
      })
      .catch(error => {
         res.status(500).json(error);
      });
});

router.post('/login', (req, res) => {
   const { username, password } = req.body;

   Users.findBy({ username })
      .first()
      .then(user => {
         if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
         } else {
            res.status(401).json({ message: 'Invalid Credentials' });
         }
      })
      .catch(error => {
         res.status(500).json(error);
      });
});

module.exports = router;
