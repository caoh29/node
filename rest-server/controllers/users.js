const User = require('../models/user');
const bcrypt = require('bcryptjs');


const GET = async (req, res) => {
  // extracts query params "?q=XXX"
  const query = req.query;
  if (query === '') {
    const users = await User.getAll();
    res.json(users);
  } else {
    const user = await User.search(query);
    user ? res.json(user) : res.status(404).json({ msg: 'user not found' });
  }
};

const POST = async (req, res) => {
  const { name, email, password, isNew, google, role } = req.body;
  const user = new User(name, email, password, isNew, google, role);

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  user.saveOne();

  delete user.password;

  res.status(201).json({
    msg: 'user created',
    user
  });
}

const PUT = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: 'pgl PUT',
    id
  });
};

const DELETE = (req, res) => {
  res.json({
    msg: 'pgl DELETE',
  });
};


module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}