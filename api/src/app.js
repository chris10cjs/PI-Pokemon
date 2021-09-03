const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
//----- import middlewares -----
const setHeaders = require("./middlewares/setHeaders.js");
const errorHandler = require("./middlewares/errorHandler.js");

require("./db.js");

const server = express();

server.name = "API";

//----- Headers -----
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use(setHeaders);

//----- Routes -----
server.use("/", routes); //server.use('/api', routes);

server.get("/", (req, res) => {
  res.send("Home: api/src/app.js");
});

//----- Errors Control -----
server.use(errorHandler); // Error catching endware.

module.exports = server;
