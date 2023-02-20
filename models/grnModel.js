const mongoose = require("mongoose");
const grnSchema = mongoose.Schema(
  {
    poId: { type: String, require: true },
    grnId: { type: String, require: true },
    date: { type: String },
    // productName: { type: String, require: true },
    product: [
      {
        type: Map,
        of: new mongoose.Schema({
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            require: true,
          },
          name: { type: Number, default: 0, require: true },
          order: { type: Number, default: 0, require: true },
          price: { type: Number, default: 0, require: true },
          qty: { type: Number, default: 0, require: true },
          total: { type: Number, default: 0 },
          unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
        }),
      },
    ],
    titem: { type: String, require: true },
    gtotal: { type: String, require: true },
    shippingcost: { type: String },
    grnType: { type: String, enum: ["in", "out"] },
    status: { type: String, enum: ["active", "suspend"] }
  },

  {
    timestamps: true,
  }
);
const grn = new mongoose.model("grn", grnSchema);
module.exports = grn;