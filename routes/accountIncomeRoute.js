const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const AccountIncome = require("../models/accountIncomeModel");
const { generateAccIncId } = require("../middlewares/generateId");
const accountIncomeRouter = express.Router();

accountIncomeRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const accountIncome = await AccountIncome.find({})
            .select({
                date: 1,
                accountHead: 1,
                details: 1,
                responsiblePerson: 1,
                paidTo: 1,
                bank: 1,
                projectName: 1,
                type: 1,
                txId: 1,
                phone: 1,
                cardType: 1,
                chequeNo: 1,
                mfsName: 1,
                amount: 1,
                status: 1,
            })
            .populate("accountHead", "name")
            .populate("responsiblePerson", "name")
            .populate("projectName", "name");

        res.send(accountIncome);
        // // res.send('removed');
        console.log(accountIncome);
    })
    // .populate("accountHead", "name")
);

accountIncomeRouter.get(
    "/:ac",
    expressAsyncHandler(async (req, res) => {
        const ac = req.params.ac
        const accountIncome = await AccountIncome.find({ accountHead: ac }).select({
            _id: 1,
            name: 1,
        });
        console.log(accountIncome);
        res.send(accountIncome);
    })
);

accountIncomeRouter.get(
    "/:rp",
    expressAsyncHandler(async (req, res) => {
        const rp = req.params.rp
        const accountIncome = await AccountIncome.find({ responsiblePerson: rp }).select({
            _id: 1,
            name: 1,
        });
        console.log(accountIncome);
        res.send(accountIncome);
    })
);

accountIncomeRouter.get(
    "/:bank",
    expressAsyncHandler(async (req, res) => {
        const bank = req.params.bank
        const accountIncome = await AccountIncome.find({ bank: bank }).select({
            _id: 1,
            name: 1,
        });
        console.log(accountIncome);
        res.send(accountIncome);
    })
);

accountIncomeRouter.get(
    "/:p",
    expressAsyncHandler(async (req, res) => {
        const p = req.params.p
        const accountIncome = await AccountIncome.find({ projectName: p }).select({
            _id: 1,
            name: 1,
        });
        console.log(accountIncome);
        res.send(accountIncome);
    })
);

accountIncomeRouter.get(
    "/:date",
    expressAsyncHandler(async (req, res) => {
        const p = req.params.date
        const accountIncome = await AccountIncome.find({ date: p }).select({
            _id: 1,
            name: 1,
        });
        console.log(accountIncome);
        res.send(accountIncome);
    })
);

accountIncomeRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const accountIncome = await AccountIncome.findOne({ _id: id })
            .select({
                date: 1,
                accountHead: 1,
                details: 1,
                responsiblePerson: 1,
                paidTo: 1,
                projectName: 1,
                type: 1,
                txId: 1,
                phone: 1,
                cardType: 1,
                chequeNo: 1,
                mfsName: 1,
                amount: 1,
                status: 1,
            })
            .populate("accountHead", "name")
            .populate("responsiblePerson", "name")
            .populate("projectName", "name");

        res.send(accountIncome);
    })
);

accountIncomeRouter.post(
    "/",
    generateAccExpId,
    expressAsyncHandler(async (req, res) => {
        console.log(req);
        const newAccountIncome = new AccountIncome(req.body);
        try {
            await newAccountIncome.save();
            res.status(200).json({
                message: "accountExpenditure is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

accountIncomeRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await AccountIncome.updateOne({ _id: id }, { $set: update })
                .then((response) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.send(err);
                });
        } catch (error) {
            console.error(error);
        }
    })
);

accountIncomeRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await AccountIncome.deleteOne({ _id: id })
                .then((response) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.send(err);
                });
        } catch (error) {
            console.error(error);
        }
    })
);

module.exports = accountIncomeRouter;