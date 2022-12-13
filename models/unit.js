const mongoose = require("mongoose");

const unitSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    symbol: { type: String, require: true, unique: true },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);

const uUnit = new mongoose.model("Unit", unitSchema);
module.exports = uUnit;
