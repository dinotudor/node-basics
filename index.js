const express = require('express');

const server = express();

server.use(express.json()); //express can recieve data in JSON format

// Query params = ?user=dino
// Route Params = users/id
// Request Body = { "name": "john", "email": "john@doe.com" }

//CRUD operations: Create, Read, Update, Delete

const users = ['John', 'Olivia', 'Dino'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Method: ${req.method} URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Username is required' });
  }
  return next();
}

//return all users
server.get('/users', (req, res) => {
  res.json(users);
});

//GET - get all users QUERY
server.get('/users', (req, res) => {
  const name = req.query.name;
  return res.json({ message: `Hello ${name}` });
});

//GET PARAMS

/* server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuario ${id}` });
}); */
//GET 'users' get one user
server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

//POST - create new user (push to array)
server.post('/users', checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//PUT - edit one user
server.put('/users/:index', checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  console.log('USERS', users);
  return res.json(users);
});

//DELETE - delete one user
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  console.log(`Deleted user: ${users[index]}`);
  return res.send();
});

server.listen(3000);
