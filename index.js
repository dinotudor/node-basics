const express = require("express");

const server = express();

server.use(express.json()); //express can recieve data in JSON format

// Query params = ?user=dino
// Route Params = users/id
// Request Body = { "name": "john", "email": "john@doe.com" }

//CRUD operations: Create, Read, Update, Delete

const users = ["John", "Olivia", "Dino"];

//return all users
server.get("/users", (req, res) => {
  res.json(users);
});

//GET - get all users QUERY
server.get("/users", (req, res) => {
  const name = req.query.name;
  return res.json({ message: `Hello ${name}` });
});

//GET PARAMS

/* server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuario ${id}` });
}); */
//GET 'users' get one user
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

//POST - create new user (push to array)
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//PUT - edit one user
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  console.log("USERS", users);
  return res.json(users);
});

//DELETE - delete one user
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  console.log(`Deleted user: ${users[index]}`);
  return res.send();
});

server.listen(3000);
