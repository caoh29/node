const Role = require('../models/role');

const GET = async (req, res) => {
  const roles = await Role.getAll();
  res.status(200).json(roles);
};

const POST = async (req, res) => {
  const { role } = req.body;
  const newRole = new Role(role);
  newRole.saveOne();

  res.status(201).json({
    msg: 'role created',
    role: newRole
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
  const id = req.params.id;
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