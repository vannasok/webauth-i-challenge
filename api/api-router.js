const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
   res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
   const password = req.body;

   const hash = bcrypt.hashSync('password', 12);

   res.status(200).json({ password, hash });
});

module.exports = router;
