const Model = require("../models/user-model");
const asyncWrapper = require("../middleware/async-wrapper");
const { CustomAPIError } = require("../custom-error/custom-error");

function getDate(date) {
  if (!date) {
    return new Date().toDateString();
  }
  return new Date(date).toDateString();
}
const createUser = asyncWrapper(async (req, res) => {
  const username = req.body.username;
  const doc = await Model.create({ username });
  res.status(200).send({ username: doc.username, _id: doc._id });
});

const displayAllUsers = asyncWrapper(async (req, res) => {
  const doc = await Model.find({}, " username , _id");
  res.status(200).send(doc);
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const id = req.params._id;
  const user = await Model.findById(id);
  const count = user.log.length +1 ;
  let { description, duration, date } = req.body;
  duration = await parseInt(duration);
  date = await getDate(date);
  const logs = await Model.findByIdAndUpdate(
    id,
    { $push: { log: { description, duration, date } }, count: count },
    { new: true }
  );
  if (!logs) {
    return next(CustomAPIError(`no user for this id: ${id}`, 404));
  }

  res
    .status(200)
    .send({
      _id: user._id,
      username: user.username,
      description: description,
      duration: duration,
      date: date,
    });
});

const getUserLogs = asyncWrapper(async (req, res, next) => {
  const id = req.params._id;
  const {from,to,limit} = req.query;

  let user = await Model.findById(id);
  console.log(user.log)
  if (!user) {
    return next(CustomAPIError(`no user for this id: ${id}`, 404));
  }
  res.status(200).send(user);
});

module.exports = { createUser, displayAllUsers, updateUser, getUserLogs };
