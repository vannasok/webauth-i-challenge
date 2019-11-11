const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

module.exports = (req, res, next) => {
   const { username, password } = req.headers;

   if (username && password) {
      Users.findBy({ username })
         .first()
         .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
               next();
            } else {
               res.status(401).json({ message: 'Wrong Username Or Password' });
            }
         })
         .catch(error => {
            res.status(500).json(error);
         });
   } else {
      res.status(400).json({ Error: 'Invalid User' });
   }
};
