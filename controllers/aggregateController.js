const catchAsync = require("./../utils/errors/catchAsync");
const appError = require("./../utils/errors/AppError");
const { DB_SCHEMAS } = require("./../constants/index");
const mongoose = require("mongoose");

exports.aggregate = catchAsync(async (req, res, next) => {
  const { pipelines } = req.body;
  const { collection } = req.params;
  let model = null;
  for (let db_schema of DB_SCHEMAS) {
    // console.log(db_schema);
    if (db_schema.toLowerCase() === collection.toLowerCase())
      model = mongoose.model(db_schema);
  }
  if (!model) return next(new appError("Collection not found", 404));
  //   const Model = req.model;

  //   if (!pipelines) return next(new AppError("Please provide pipelipnes", 401));

  let agg = JSON.parse(pipelines);
  //   console.log(agg[0].$group._id);

  //   // console.log('PIPELINES: ', pipelines);
  //   // console.log(agg[0]['$match']['$or']);
  //   // console.log(agg[0]['$match']);
  //   //

  const result = await model.aggregate(agg, {
    allowDiskUse: true /* temp fix */,
  });

  res.status(200).json({
    status: "success",
    env: {
      result,
      total: result.length,
    },
  });
});
