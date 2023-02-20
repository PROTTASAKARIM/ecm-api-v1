const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const AccountExpenditure = require("../models/accountExpenditureModel");
const { generateAccExpId } = require("../middlewares/generateId");
const accountExpenditureRouter = express.Router();

//GET ALL accountExpenditures
accountExpenditureRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const accountExpenditure = await AccountExpenditure.find({})
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

    res.send(accountExpenditure);
    // // res.send('removed');
    console.log(accountExpenditure);
  })
  // .populate("accountHead", "name")
);

//GET ALL AccountExpenditure DW
accountExpenditureRouter.get(
  "/dw",
  expressAsyncHandler(async (req, res) => {
    const accountExpenditure = await accountExpenditure.find({}).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);
//GET ALL AccountExpenditure for account head
accountExpenditureRouter.get(
  "/:ac",
  expressAsyncHandler(async (req, res) => {
    const ac = req.params.ac
    const accountExpenditure = await accountExpenditure.find({ accountHead: ac }).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);
//GET ALL AccountExpenditure for responsiblePerson
accountExpenditureRouter.get(
  "/:rp",
  expressAsyncHandler(async (req, res) => {
    const rp = req.params.rp
    const accountExpenditure = await accountExpenditure.find({ responsiblePerson: rp }).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);
//GET ALL AccountExpenditure for bank
accountExpenditureRouter.get(
  "/:bank",
  expressAsyncHandler(async (req, res) => {
    const bank = req.params.bank
    const accountExpenditure = await accountExpenditure.find({ bank: bank }).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);

//GET ALL AccountExpenditure for projectName
accountExpenditureRouter.get(
  "/:p",
  expressAsyncHandler(async (req, res) => {
    const p = req.params.p
    const accountExpenditure = await accountExpenditure.find({ projectName: p }).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);
//GET ALL AccountExpenditure for projectName
accountExpenditureRouter.get(
  "/:date",
  expressAsyncHandler(async (req, res) => {
    const p = req.params.date
    const accountExpenditure = await accountExpenditure.find({ date: p }).select({
      _id: 1,
      name: 1,
    });
    console.log(accountExpenditure);
    res.send(accountExpenditure);
  })
);

// GET accountExpenditure by id
accountExpenditureRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const accountExpenditure = await AccountExpenditure.find({ _id: id })
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

    res.send(accountExpenditure[0]);
  })
);

// // GET BANK BY ACCOUNTNO
// bankRouter.get(
//   "/accountNo/:accountNo",
//   expressAsyncHandler(async (req, res) => {
//     const accountNo = req.params.accountNo;
//     const bank = await Bank.find({ accountNo: accountNo });
//     res.send(bank);
//   })
// );

// CREATE ONE accountExpenditure
accountExpenditureRouter.post(
  "/",
  generateAccExpId,
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const newAccountExpenditure = new AccountExpenditure(req.body);
    try {
      await newAccountExpenditure.save();
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

//GET ALL AccountExpenditure DW
// accountExpenditureRouter.get(
//   "/dw",
//   expressAsyncHandler(async (req, res) => {
//     const accountExpenditure = await accountExpenditure
//       .find({})
//       .select({
//         _id: 1,
//         name: 1,
//       })
//       .populate("project", "name");
//     res.send(accountExpenditure);
//     // // res.send('removed');
//     console.log(accountExpenditure);
//   })
// );

// UPDATE ONE Account Expenditure
accountExpenditureRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await AccountExpenditure.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE BANK
accountExpenditureRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await AccountExpenditure.deleteOne({ _id: id })
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

module.exports = accountExpenditureRouter;
