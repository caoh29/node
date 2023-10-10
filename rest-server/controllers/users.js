const { ObjectId } = require('mongodb');
const { serialize } = require('../helpers/salt');
const User = require('../models/user');

const GET = async (req, res) => {
  // extracts query params "?q=XXX"
  const query = req.query.q;
  if (query === undefined || query === '' || query === null) { 
    const users = await User.getAll();
    users.length === 0 && res.status(404).json({ msg: 'no users found' });
    res.json(users);
  } else {
    const user = await User.search(query);
    user ? res.json(user) : res.status(404).json({ msg: 'user not found' });
  }
};

const POST = async (req, res) => {
  const { name, email, password, isNew = false, google = false, role } = req.body;

  const serializedPassword = serialize(password);

  const user = new User(name, email, serializedPassword, isNew, google, role);

  user.save();

  res.status(201).json({ msg: 'user created' });
}

const PUT = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (id === '' || id === undefined) {
    res.status(400).json({ msg: 'missing id' });
  } else {
    const currentUser = await User.search(id);
    currentUser === null && res.status(404).json({ msg: 'user not found' });

    Object.keys(body).forEach(key => {
      currentUser[key] = body[key];
    });

    currentUser.password = serialize(currentUser.password);

    const user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.isNew, currentUser.google, currentUser.role);

    user.update(new ObjectId(id));
    res.status(204);
  }
};

const DELETE = async (req, res) => {
  const id = req.params.id;
  if (id === '' || id === undefined) {
    res.status(400).json({ msg: 'missing id' });
  } else {
    const currentUser = await User.search(id);
    currentUser === null && res.status(404).json({ msg: 'user not found' });

    const user = new User(currentUser.name, currentUser.email, currentUser.password, currentUser.isNew, currentUser.google, currentUser.role);
    
    user.delete(new ObjectId(id));
  }
  res.status(204);
};


module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}