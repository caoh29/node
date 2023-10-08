const { Router } = require('express');
const { GET, PUT, POST, DELETE } = require('../controllers/roles');
const { validateFields } = require('../middlewares/validate-data');
const { check } = require('express-validator');

const router = Router();

router.get('/', GET);

// to use dynamic params just type ":XXX" replace XXX for the value you want
router.put('/:id', PUT);

router.delete('/:id', DELETE);

router.post('/', [
  check('role', 'role is required').not().isEmpty(),
  validateFields
], POST);

module.exports = router;