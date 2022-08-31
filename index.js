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

// ## Rotas ##

app.get("/games", async (req, res) => {
  const response = await Games.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.send(response);
});

app.post("/post/game", async (req, res) => {
  const { title, price, year } = req.body;
  // if (!title && !price && !year) {
  //   return res.status(400).json({
  //     causa: "Nenhum dos campos podem ser vazios",
  //     solucao: "Preencha os campos corretamente",
  //   });
  // }

  // if (!title) {
  // }
  // if (!price) {
  // }
  // if (!year) {
  // }

  const reqField = ["title", "price", "year"];

  for (const field of reqField) {
    if (!req.body[field]) {
      return res.status(400).json({
        causa: "Nenhum dos campos podem ser vazios",
        solucao: "Preencha todos os campos corretamente",
      });
    }
  }

  await Games.create({
    title: title,
    price: price,
    year: year,
  });
  res.send("Jogo salvo com sucesso.");
});
