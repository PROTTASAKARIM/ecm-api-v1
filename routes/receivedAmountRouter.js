const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const ReceivedAmount = require("../models/receivedAmountModel");
const { generateReceivedAmountId } = require("../middlewares/generateId");
const receivedAmountRouter = express.Router();

//GET ALL receivedAmountS
receivedAmountRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const receivedAmount = await ReceivedAmount.find({}).select({
      // slNo: 1,
      date: 1,
      // accHead: 1,
      details: 1,
      amount: 1,
      type: 1,
      chequeNo: 1,
      bank: 1,
      particular: 1,
      status: 1,
    })
      .populate("bank", "name");
    res.send(receivedAmount);
    // // res.send('removed');
    console.log(receivedAmount);
  })
);

// GET receivedAmount by id
receivedAmountRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const receivedAmount = await ReceivedAmount.find({ _id: id }).select({
      // slNo: 1,
      date: 1,
      // accHead: 1,
      details: 1,
      amount: 1,
      type: 1,
      chequeNo: 1,
      bank: 1,
      particular: 1,
      status: 1,
    })
      .populate("bank", "name");
    res.send(receivedAmount[0]);
  })
);


// CREATE ONE receivedAmount
receivedAmountRouter.post(
  "/",
  generateReceivedAmountId,
  expressAsyncHandler(async (req, res) => {
    const newReceivedAmount = new ReceivedAmount(req.body);
    try {
      await newReceivedAmount.save();
      res.status(200).json({
        message: "receivedAmount is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

//GET ALL ReceivedAmount DW
receivedAmountRouter.get(
  "/dw",
  expressAsyncHandler(async (req, res) => {
    const receivedAmount = await receivedAmount.find({}).select({
      _id: 1,
      name: 1,
    })
      .populate("bank", "name")
    res.send(receivedAmount);
    // // res.send('removed');
    console.log(receivedAmount);
  })
);

// UPDATE ONE receivedAmount
receivedAmountRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await ReceivedAmount.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE receivedAmount
receivedAmountRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await ReceivedAmount.deleteOne({ _id: id })
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

module.exports = receivedAmountRouter;
