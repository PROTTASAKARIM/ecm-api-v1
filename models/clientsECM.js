const mongoose = require("mongoose");
const clientsECMSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phoneNumber: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        designation: { type: String, require: true },
        company: { type: String, require: true },
        treadLicence: { type: String, require: true },
        // photo: { type: String },
        // type: { type: String },
        status: { type: String, enum: ["active", "inactive"] },
    },
    {
        timestamps: true,
    }
);

const clientsECM = new mongoose.model("client", clientsECMSchema);
module.exports = clientsECM;