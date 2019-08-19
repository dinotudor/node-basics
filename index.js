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
//check user exists - local middleware
function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Username is required' });
  }
  return next();
}

//check if user is in array - local middleware
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exist' });
  }
  req.user = user;
  return next();
}

//GET - list all users
server.get('/users', (req, res) => {
  res.json(users);
});

//GET - list all users QUERY
//server.get('/users', (req, res) => {
//  const name = req.query.name;
//  return res.json({ message: `Hello ${name}` });
//});

//GET PARAMS

/* server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Buscando usuario ${id}` });
}); */

//GET - list one user
server.get('/users/:index', checkUserInArray, (req, res) => {
  //  const { index } = req.params; (As the middleware 'checkUserInArray' is defined, all methods using the middleware have acces to the variable
  return res.json(req.user);
});

//POST - create new user (push to array)
server.post('/users', checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//PUT - edit one user
server.put('/users/:index', checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  console.log('USERS', users);
  return res.json(users);
});

//DELETE - delete one user
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  console.log(`Deleted user: ${users[index]}`);
  return res.send();
});

server.listen(3000);
