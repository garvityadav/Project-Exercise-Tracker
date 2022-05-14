const express = require('express');
const router = express.Router();
const {createUser, displayAllUsers} = require('../controller/index');

router.route('/').post(createUser).get(displayAllUsers);


module.exports = router;