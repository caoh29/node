const { Router } = require('express');
const { check } = require('express-validator');

const { GET, PUT, POST, DELETE } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-data');
const { isValidRole, isValidEmail } = require('../helpers/db-validators');


const router = Router();

router.get('/', GET);

// to use dynamic params just type ":XXX" replace XXX for the value you want
router.put('/:id', PUT);

router.delete('/:id', DELETE);

// Second parameter is an array of middlewares to be executed before the controller function
// Third parameter is the controller function
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'incorrect email format').isEmail().custom(isValidEmail),
  check('password', 'password is required with min 6 characters').isLength({ min: 6 }),
  // check('role', 'invalid role').custom(role => isValidRole(role)),
  // line 24 is the same as line 26
  check('role', 'invalid role').custom(isValidRole),
  validateFields
], POST);

module.exports = router;