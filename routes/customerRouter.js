/**
 * customers API
 * 1. get all customers
 * 2. get Customer by id
 * 3. get Customer by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const checklogin = require("../middlewares/checkLogin");

const customerRouter = express.Router();

// GET ALL customers
customerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const customers = await Customer.find({ status: "active" });
    res.send(customers);
    console.log(customers);
    // // res.send('removed');
  })
);

// GET ONE customers
customerRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const customers = await Customer.find({ _id: id, status: "active" });
    res.send(customers);
    // // res.send('removed');
    console.log(customers);
  })
);

// CREATE ONE Customer
customerRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newCustomer = new Customer(req.body);
    try {
      await newCustomer.save();
      res.status(200).json({
        message: "Customer is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI customers
customerRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Customer.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "customers are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Customer
customerRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Customer.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Customer
customerRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Customer.deleteOne({ _id: id })
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

// USER SIGNIN
customerRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      let userNameGen = req.body.name;
      let un = userNameGen.replace(" ", "").substring(0, 10).toLowerCase();
      const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        username: un,
        phone: req.body.phone,
        type: req.body.type,
        address: req.body.address,
        membership: req.body.membership,
        password: hashPassword,
        status: req.body.status,
      });
      await newCustomer.save();
      res.status(200).json({
        message: "Registration Successful",
        status: "success",
        data: un,
      });
    } catch (error) {
      res.status(400).json({
        message: "Registration Unsuccessful",
        error: error,
        ststus: "fail",
      });
    }

    // res.send(newUser);?
  })
);

// USER LOGIN
customerRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const customer = await Customer.find({
        status: "active",
        username: req.body.username,
      });

      if (customer && customer.length > 0) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (isValidPassword) {
          // generate token
          const token = jwt.sign(
            {
              username: customer[0].username,
              userId: customer[0]._id,
              type: customer[0].type,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            access_token: token,
            status: "success",
            message: "Login Successful",
          });
        } else {
          res.status(401).json({
            status: "fail",
            error: "Password Doesnot Match",
          });
        }
      } else {
        res.status(401).json({
          status: "fail",
          error: "User Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        error: err,
      });
    }
  })
);

module.exports = customerRouter;