const { Router } = require('express');
const { GET, PUT, POST, DELETE } = require('../controllers/users');

const router = Router();

router.get('/', GET);

// to use dynamic params just type ":XXX" replace XXX for the value you want
router.put('/:id', PUT);

router.delete('/', DELETE);

router.post('/', POST);

module.exports = router;