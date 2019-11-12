const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/user-router.js");
const knexConnection = require("../data/dbConfig.js");

const server = express();

const sessionConfiguration = {
  name: "testing",
  secret: process.env.COOKIE_SECRET || "secret and safe",
  cookie: {
    maxAge: 1000 * 60 * 60, // valid for 1 hour
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 60, // delete expired sessions 60min
    tablename: "user_sessions",
    sidfieldname: "sid",
    createtable: true
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "api running", session: req.session });
});

module.exports = server;
