const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
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
  const { name, email, password, isNew, google, role } = req.body;
  const user = new User(name, email, password, isNew, google, role);

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  user.saveOne();

  const { password: pass, ...userWithoutPass } = user;

  res.status(201).json({
    msg: 'user created',
    userWithoutPass
  });
}

const PUT = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (id === '' || id === undefined) {
    res.status(400).json({ msg: 'missing id' });
  } else {
    const user = await User.search(id);
    user === null && res.status(404).json({ msg: 'user not found' });
    Object.keys(body).forEach(key => {
      user[key] = body[key];
    });

    const userToSave = new User(user.name, user.email, user.password, user.isNew, user.google, user.role);
    const salt = bcrypt.genSaltSync();
    userToSave.password = bcrypt.hashSync(user.password, salt);
    const objectId = new ObjectId(id);
    userToSave._id = objectId;
    userToSave.updateOne(objectId);

    const { password: pass, ...userWithoutPass } = userToSave;
    res.json(userWithoutPass);
  }
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