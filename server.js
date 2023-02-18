const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const errorController = require("./controllers/errorController");
const middlewares = require("./middlewares/index");

const router = require("./routes/index");

require("dotenv").config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

middlewares.init(app);
router.init(app);

app.get("/api/v3/health", (req, res, next) => {
  console.log("HEALTH");
  res.status(200).json({
    status: "success",
    message: "Up and Running!",
  });
});

//Connect mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"));

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
app.use(errorController);
