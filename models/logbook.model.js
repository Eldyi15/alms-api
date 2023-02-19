const mongoose = require("mongoose");

const logbookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    type: {
      type: "String",
      enums: ["checkin", "checkout"],
    },
    loggedDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Logbook = mongoose.model("Logbook", logbookSchema);
module.exports = Logbook;
