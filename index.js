const { json } = require("express");
const express = require("express");
const cors = require("cors");
const connection = require("./database/index");
const app = express();

// ## Models ##
const Games = require("./model/Games");

// ## Database ##
connection.authenticate().then(() => {
  console.log("connected");
});

app.listen(2356, () => {
  console.log("Server working.");
});
app.use(json());
app.use(cors());
