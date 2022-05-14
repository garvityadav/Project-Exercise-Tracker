const express = require('express');
const router = express.Router();
const {createUser} = require('../controller/index');

router.route('/').post(createUser);


module.exports = router;