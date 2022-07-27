/**
 * sales API
 * 1. get all sales
 * 2. get Sale by id
 * 3. get Sale by type
 * 3.1 get Sale by email
 * 3.2 get Sale by phone
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Sale = require("../models/saleModel");
const checklogin = require("../middlewares/checkLogin");
const { generatePosId } = require("../middlewares/generateId");
const { startOfDay, endOfDay } = require("date-fns");

const saleRouter = express.Router();

// GET ALL sales
saleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const start = req.params.start
      ? startOfDay(new Date(req.params.start))
      : startOfDay(new Date());
    const end = req.params.end
      ? endOfDay(new Date(req.params.end))
      : endOfDay(new Date());
    const sales = await Sale.find({
      status: "complete",
      createdAt: { $gte: start, $lte: end },
    })
      .select({
        poNo: 1,
        supplier: 1,
        warehouse: 1,
        type: 1,
        totalItem: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("supplier", "name")
      .populate("warehouse", "name")
      .populate("userId", "name");
    res.send(sales);
    // // res.send('removed');
  })
);

// GET ONE sales
saleRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const sales = await Sale.find({ _id: id, status: "complete" });
    res.send(sales[0]);
    // // res.send('removed');
    console.log(sales);
  })
);

// CREATE ONE SALE
saleRouter.post(
  "/",
  generatePosId,
  expressAsyncHandler(async (req, res) => {
    const newSale = new Sale(req.body);
    console.log(newSale);
    try {
      await newSale.save((err, sale) => {
        if (err) {
          res
            .status(500)
            .json({ message: "There was a server side error", error: err });
        } else {
          console.log(sale);
          res.status(200).json({
            message: "Sale is created Successfully",
            data: req.body,
          });
        }
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI sales
saleRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Sale.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "sales are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Sale
saleRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Sale.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Sale
saleRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Sale.deleteOne({ _id: id })
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

module.exports = saleRouter;
