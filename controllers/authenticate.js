const AppError = require("../utils/errors/AppError");
const catchAsync = require("../utils/errors/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const LibraryUser = require("../models/library/library_user.model");


exports.authenticate = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  //   console.log(req.headers);
  //Getting token and check if its there
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please login to access request!", 401));
  }

  //   Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   console.log(decoded);

  let user = await User.findById(decoded.id);
  //Find from Library Users
  if(!user) user = await LibraryUser.findById(decoded.id);

  if (!user) return next(new AppError(`User no longer exist`), 401);

  //   check if user changed password  after token issued
  if (user.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(`User changed his/her password! Please log in again`, 401)
    );
  }

  req.user = user;
  next();
});
