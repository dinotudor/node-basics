const express = require("express");

const server = express();

// Query params = ?user=dino

server.get("/users", (req, res) => {
  const name = req.query.name;
  res.json({ message: `Hello ${name}` });
});

server.listen(3000);
