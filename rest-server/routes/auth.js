const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-data');

const router = Router();

router.post('/login', [
  check('email', 'incorrect email format').isEmail(),
  check('password', 'password is required with min 6 characters').not().isEmpty().isLength({ min: 6 }),
  validateFields
], login);

router.post('/google', [
  check('token', 'token is required').not().isEmpty(),
  validateFields
], googleSignIn);

module.exports = router;