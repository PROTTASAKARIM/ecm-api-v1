const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Purchase = require("../models/purchaseModel");
const {generatePoId} = require("../middlewares/generateId");

const purchaseRouter = express.Router();

//GET ALL purchase
purchaseRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const purchase = await Purchase.find({});
        res.send(purchase);
        // // res.send('removed');
        console.log(purchase);
    })
);

// GET Purchase by id
purchaseRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const purchase = await Purchase.findOne({ _id: id }).select({
            prid: 1,
            reqId: 1,
            user: 1,
            product: 1,
            titem: 1,
            gtotal: 1,
<<<<<<< HEAD
            supplier: 1,
            poId: 1,
            shippingcost: 1,
            
        })
        .populate("user", "name")
        .populate("supplier", "name")
        .populate("reqId", "reqId")
        console.log(purchase)
        res.send(purchase);
=======

        });
        res.send(purchase[0]);
>>>>>>> 7ff2e38a05e872931baabe93fd6691d9b66818f6
    })
);
purchaseRouter.get(
    "/dw",
    expressAsyncHandler(async (req, res) => {
        const purchase = await Purchase.find({});
        res.send(purchase);
        // // res.send('removed');
        console.log(purchase);
    })
);

// CREATE ONE Purchase
purchaseRouter.post(
    "/",
    generatePoId,
    expressAsyncHandler(async (req, res) => {
        const newPurchase = new Purchase(req.body);
        try {
            await newPurchase.save();
            res.status(200).json({
                message: "Purchase is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
        // console.log(newPurchase)
    })
);

// UPDATE ONE Purchase
purchaseRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Purchase.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Purchase
purchaseRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Purchase.deleteOne({ _id: id })
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

module.exports = purchaseRouter;