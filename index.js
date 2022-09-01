const { json, response } = require("express");
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

app.get("/game/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({
      causa: "O id passado é do tipo texto",
      solucao: "O id deve ser do tipo número",
    });
  }
  const response = await Games.findOne({
    where: { id },
  });
  res.send(response);
});

app.post("/post/game", async (req, res) => {
  const { title, price, year } = req.body;

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

app.put("/attgame/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({
      causa: "O id passado é do tipo texto",
      solucao: "O id deve ser do tipo número",
    });
  }

  const response = await Games.findOne({
    where: { id },
  });

  const { title, price, year } = req.body;

  if (title != undefined) {
    response.title = title;
    await response.save();
  }

  if (price != undefined) {
    if (isNaN(price)) {
      return res.status(400).json({
        causa: "O campo preço passado é do tipo texto",
        solucao: "O campo preço deve ser do tipo número",
      });
    }
    response.price = price;
    await response.save();
  }

  if (year != undefined) {
    response.year = year;
    await response.save();
  }

  res.status(200).json({
    operacao: "Tabela atualizada com sucesso.",
  });
});

app.delete("/game/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({
      causa: "O campo preço passado é do tipo texto",
      solucao: "O campo preço deve ser do tipo número",
    });
  }

  const response = await Games.findOne({
    where: { id },
  });
  await response.destroy();

  res.status(200).json({
    operacao: "Tabela atualizada com sucesso.",
  });
});
