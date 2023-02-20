const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projects");

const projectRouter = express.Router();

//GET ALL PROJECTS
projectRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const projects = await Project.find({}).select({
            name: 1,
            pid: 1,
            client: 1,
            location: 1,
            details: 1,
            budgets: 1,
            stuff: 1,
            duration: 1,
            workOrder: 1,
            status: 1,

        })
            .populate("client", "name")
        console.log(projects);
        res.send(projects);
        // // res.send('removed');
    })
);

// // GET ALL PROJECT BY TYPE
// userRouter.get(
//     "/type/:type",
//     expressAsyncHandler(async (req, res) => {
//       let type = req.params.type;
//       let query = {type: type}

//       if(type === "all"){
//         query = {}
//       }


//       const projects = await Project.find(query);
//       res.send(projects);
//     })
//   );

//GET ALL PROJECTS DW
projectRouter.get(
    "/dw",
    expressAsyncHandler(async (req, res) => {
        const projects = await Project.find({}).select({
            _id: 1,
            name: 1,
        })
        // <<<<<<< HEAD
        //         //  .populate("user", "name")
        //         res.send(projects);
        //         // // res.send('removed');
        // =======
        // >>>>>>> 83e7c9d97d0e49459dcf5318c0a00f0bdf6920f5
        console.log(projects);
        res.send(projects);
    })
);

// GET Project BY ID
projectRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const project = await Project.find({ _id: id }).select({
            name: 1,
            client: 1,
            location: 1,
            details: 1,
            budgets: 1,
            stuff: 1,
            duration: 1,
            workOrder: 1,
            subContractor: 1,
        })
            .populate("client", "name")
            .populate("subContractor", "name");
        res.send(project[0]);
    })
);

// GET Project BY pid
projectRouter.get(
    "/pid/:pid",
    expressAsyncHandler(async (req, res) => {
        const phone = req.params.pid;
        const project = await Project.find({ pid: pid });
        res.send(project);
    })
);

// GET Project BY workOrder
projectRouter.get(
    "/workOrder/:workOrder",
    expressAsyncHandler(async (req, res) => {
        const workOrder = req.params.workOrder;
        const project = await Project.find({ workOrder: workOrder });
        res.send(project);
    })
);

// CREATE ONE Project
projectRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newProject = new Project(req.body);
        try {
            await newProject.save().then(result => {
                console.log(result.data)
                res.status(200).json({
                    message: "Project is created Successfully",
                });

            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// UPDATE ONE Project
projectRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Project.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE PROJECT
projectRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Project.deleteOne({ _id: id })
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



module.exports = projectRouter;