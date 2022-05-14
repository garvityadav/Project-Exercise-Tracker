const express = require('express');
const router = express.Router();
const {createUser, displayAllUsers,updateUser, getUserLogs} = require('../controller/index');

router.route('/').post(createUser).get(displayAllUsers);
router.route('/:_id/exercises').post(updateUser);
router.route('/:id/logs').get(getUserLogs)
module.exports = router;