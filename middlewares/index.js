const cors = require("cors");
const mongoose = require("mongoose");
const { DB_SCHEMAS } = require("./../constants/index");

exports.init = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:4200"],
      methods: ["POST", "PATCH", "PUT", "DELETE", "GET"],
    })
  );
  let schemas = [];
  let models = mongoose.modelNames();
  if (models.length) {
    for (const model of models) {
      DB_SCHEMAS.push(model);
      schemas.push(mongoose.model(model).schema.paths);
    }
  }
};
