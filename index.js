const express = require("express");

const server = express();

// Query params = ?user=dino
// Route Params = users/id
// Request Body = { "name": "john", "email": "john@doe.com" }

//CRUD operations: Create, Read, Update, Delete

const users = ["John", "Olivia", "Dino"];

//return all users
server.get("/users", (req, res) => {
  res.json(users);
});

//QUERY
server.get("/users", (req, res) => {
  const name = req.query.name;
  return res.json({ message: `Hello ${name}` });
});

// PARAMS
/* server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuario ${id}` });
}); */

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.listen(3000);
