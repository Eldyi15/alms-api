const catchAsync = require("./../utils/errors/catchAsync");
const appError = require("./../utils/errors/AppError");
const QueryFeatures = require("./../utils/query/QueryFeature");
const LogBookModel = require("./../models/logbook.model");

exports.createLogs = catchAsync(async (req, res, next) => {
  const logs = await LogBookModel.create(req.body);
  res.status(200).json({
    status: "success",
    logs,
  });
});

exports.aggregateLogs = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.body;

  // let startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  // let endDate = new Date(new Date(date).setHours(23, 59, 59, 999));
  console.log(new Date(startDate), new Date(endDate));

  const initialQuery = [
    {
      $match: {
        $and: [
          {
            loggedDate: { $gte: new Date(startDate) },
          },
          {
            loggedDate: { $lte: new Date(endDate) },
          },
        ],
      },
    },
    {
      $group: {
        _id: { type: "$type", user: "$user" },
        items: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id.user",
        foreignField: "_id",
        as: "user-details",
      },
    },
    { $unwind: "$user-details" },
    {
      $project: {
        _id: 0,
        type: "$_id.type",
        user_details: "$user-details",
        items: "$items",
      },
    },
  ];

  const logs = await LogBookModel.aggregate(initialQuery);

  res.status(200).json({
    status: "success",
    logs,
  });
});
