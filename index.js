const express = require("express");

const server = express();

// Query params = ?user=dino
// Route Params = users/id

server.get("/users", (req, res) => {
  const name = req.query.name;
  return res.json({ message: `Hello ${name}` });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuario ${id}` });
});

server.listen(3000);
