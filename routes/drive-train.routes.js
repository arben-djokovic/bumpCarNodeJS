import express from "express";
import DriveTrain from "../models/DriveTrain.js";

const router = express.Router();


router.get("/drive-trains", async(req, res) => {
    try{
        const driveTrains = await DriveTrain.find()
        res.json(driveTrains)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/drive-trains", async(req, res) => {
    try{
        const driveTrain = new DriveTrain({name: req.body.name})
        await driveTrain.save()
        res.json(driveTrain)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/drive-trains/:id", async(req, res) => {
    try{
        const driveTrain = await DriveTrain.findByIdAndDelete(req.params.id) 
        if(!driveTrain) return res.status(404).json({ message: "DriveTrain not found" });
        res.json(driveTrain)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})


export default router