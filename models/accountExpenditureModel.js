const mongoose = require("mongoose");
const accountExpenditureSchema = mongoose.Schema(
    {
        generateAccExpId: { type: String, require: true },
        date: { type: Date },
        accountHead: { type: mongoose.Types.ObjectId, ref: "AccountHead" },
        details: { type: String, require: true },
        responsiblePerson: { type: mongoose.Types.ObjectId, ref: "User" },
        paidTo: { type: String, require: true },
        bank: { type: mongoose.Types.ObjectId, ref: "Bank" },
        projectName: { type: mongoose.Types.ObjectId, ref: "Project" },
        type: { type: String, require: true },
        txId: { type: String, },
        phone: { type: String, },
        cardType: { type: String, },
        chequeNo: { type: String },
        mfsName: { type: String },
        amount: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountExpenditure = new mongoose.model("AccountExpenditure", accountExpenditureSchema);
module.exports = accountExpenditure;