const catchAsync = require("./../utils/errors/catchAsync");
const appError = require("./../utils/errors/AppError");
const UserModel = require("./../models/user.model");
const QueryFeatures = require("./../utils/query/QueryFeature");

const jwt = require("jsonwebtoken");
exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body, "BODY");
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    env: {
      user: newUser,
      token,
    },
  });
});

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

exports.createUser = catchAsync(async (req, res, next) => {
  // const {user,body} = req

  req.body["password"] = "ALMS1234!";
  req.body["passwordConfirm"] = "ALMS1234!";

  const createdUser = await UserModel.create(req.body);
  const token = signToken(createdUser._id);

  res.status(200).json({
    status: "success",
    user: createdUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    next(new appError("Please provide email and password"), 400);

  const user = await UserModel.findOne({ email }).select("+password");
  console.log(user);
  const isMatch = user.comparePassword(password, user.password);
  if (!user || !isMatch) {
    next(new appError("Incorrect email or password"), 401);
  }
  //   console.log(user);
  const token = signToken(user._id);

  user["password"] = undefined;

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const userQuery = new QueryFeatures(UserModel.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await userQuery.query;

  res.status(200).json({
    status: "success",
    env: {
      users,
    },
  });
});

exports.getuserCounts = catchAsync(async (req, res, next) => {
  const users = await UserModel.aggregate([
    {
      $match: {
        user_type: "user",
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    users,
  });
});
