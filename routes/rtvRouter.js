/**
 * rtvs API
 * 1. get all rtvs
 * 2. get Rtv by id
 * 3. get Rtv by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Rtv = require("../models/rtvModel");
const checklogin = require("../middlewares/checkLogin");
const { generateRtvId } = require("../middlewares/generateId");

const rtvRouter = express.Router();

// GET Count rtv
rtvRouter.get(
  "/count",
  expressAsyncHandler(async (req, res) => {
    const total = await Rtv.countDocuments({});
    // console.log("id");
    res.status(200).json(total);
  })
);

// GET ALL rtvs
rtvRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const rtvs = await Rtv.find({})
      .select({
        grnNo: 1,
        rtvNo: 1,
        userId: 1,
        totalItem: 1,
        supplier: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("grnNo", "grnNo")
      .populate("supplier", { company: 1 })
      .populate("warehouse", "name")
      .populate("userId", "name");
    res.send(rtvs);
    // // res.send('removed');
    console.log(rtvs);
  })
);

// GET ONE rtvs
rtvRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const rtvs = await Rtv.find({ _id: id })
      .select({
        grnNo: 1,
        rtvNo: 1,
        userId: 1,
        totalItem: 1,
        supplier: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("grnNo", "grnNo")
      .populate("supplier", { company: 1, email: 1, phone: 1, address: 1 })
      .populate("warehouse", "name")
      .populate("userId", "name");
    res.send(rtvs[0]);
    // // res.send('removed');
    console.log(rtvs);
  })
);

// CREATE ONE Rtv
rtvRouter.post(
  "/",
  generateRtvId,
  expressAsyncHandler(async (req, res) => {
    const newRtv = new Rtv(req.body);
    try {
      await newRtv.save();
      res.status(200).json({
        message: "Rtv is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI rtvs
rtvRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Rtv.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "rtvs are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Rtv
rtvRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Rtv.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Rtv
rtvRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Rtv.deleteOne({ _id: id })
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

// GET ALL RTV WITH PAGENATION & SEARCH
rtvRouter.get(
  "/:page/:size",
  expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const size = parseInt(req.params.size);
    const queryString = req.query?.q?.trim().toString().toLocaleLowerCase();
    const currentPage = page + 0;

    let query = {};
    let rtv = [];
    // const size = parseInt(req.query.size);
    console.log("page:", currentPage, "size:", size, "search:", queryString);
    console.log(typeof queryString);

    //check if search or the pagenation

    if (queryString) {
      console.log("== query");

      console.log("search:", query);
      query = { rtvNo: { $regex: new RegExp(queryString + ".*?", "i") } };

      console.log(query);

      rtv = await Rtv.find(query)
        .select({
          grnNo: 1,
          rtvNo: 1,
          userId: 1,
          totalItem: 1,
          supplier: 1,
          total: 1,
          status: 1,
          createdAt: 1,
        })
        .populate("grnNo", "grnNo")
        .populate("supplier", { company: 1 })
        .populate("warehouse", "name")
        .populate("userId", "name");
      res.status(200).json(rtv);
    } else {
      console.log("no query");

      // regular pagination
      query = {};

      rtv = await Rtv.find(query)
        .select({
          grnNo: 1,
          rtvNo: 1,
          userId: 1,
          totalItem: 1,
          supplier: 1,
          total: 1,
          status: 1,
          createdAt: 1,
        })
        .populate("grnNo", "grnNo")
        .populate("supplier", { company: 1 })
        .populate("warehouse", "name")
        .populate("userId", "name");

      res.status(200).json(rtv);
      console.log("done:", query);
    }
  })
);

module.exports = rtvRouter;
