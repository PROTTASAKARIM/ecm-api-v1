/**
 * prices API
 * 1. get all prices
 * 2. get Price by id
 * 3. get Price by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Price = require("../models/priceModel");
const checklogin = require("../middlewares/checkLogin");

const priceRouter = express.Router();

// GET ALL prices
priceRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const prices = await Price.find({ status: "active" });
    res.send(prices);
    // // res.send('removed');
    console.log(prices);
  })
);

// GET ONE prices
priceRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const prices = await Price.find({ _id: id, status: "active" });
    res.send(prices);
    // // res.send('removed');
    console.log(prices);
  })
);

// CREATE ONE Price
priceRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newPrice = new Price(req.body);
    try {
      await newPrice.save();
      res.status(200).json({
        message: "Price is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI prices
priceRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Price.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "prices are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Price
priceRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Price.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Price
priceRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Price.deleteOne({ _id: id })
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

module.exports = priceRouter;