const Model = require("../models/user-model");
const asyncWrapper = require("../middleware/async-wrapper");
const { CustomAPIError } = require("../custom-error/custom-error");

function getDate(date) {
  if (!date) {
    return new Date().toDateString().toString();
  }
  return new Date(date).toDateString().toString();
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
  const count = user.log.length + 1;
  let { description, duration, date } = req.body;
  duration = await parseInt(duration);
  date = await getDate(date)
  const logs = await Model.findByIdAndUpdate(
    id,
    { $push: { log: { description, duration, date } }, count: count },
    { new: true }
  );
  if (!logs) {
    return next(CustomAPIError(`no user for this id: ${id}`, 404));
  }

  res.status(200).send({
    _id: user._id,
    username: user.username,
    description: description,
    duration: duration,
    date: date,
  });
});

const getUserLogs = asyncWrapper(async (req, res, next) => {
  const id = req.params._id;
  let { from, to, limit } = req.query;
  if (!from) {
    from = await new Date(0).toDateString();
  }
  if (!to) {
    to = await new Date().toDateString();
  }
  let user = await Model.findById(id);
  let length = user.log.length;
  if (!limit) {
    limit = length;
  }
  let log = user.log;
  log = log.filter((log) => {
    if (
      from &&
      new Date(log.date).getTime() >= new Date(from).getTime() &&
      to &&
      new Date(log.date).getTime() <= new Date(to).getTime()
    ) {
      return true;
    }
  });
  log = log.slice(0, limit);

  if (!user) {
    return next(CustomAPIError(`no user for this id: ${id}`, 404));
  }
  res
    .status(200)
    .send({ _id: id, username: user.username, count: limit, log: log });
});

module.exports = { createUser, displayAllUsers, updateUser, getUserLogs };
