import express from "express";
import FuelType from "../models/FuelType.js";

const router = express.Router();
router.get("/fuel-types", async(req, res) => {
    try{
        const fuelTypes = await FuelType.find()
        res.json(fuelTypes)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/fuel-types", async(req, res) => {
    try{
        const fuelType = new FuelType({name: req.body.name})
        await fuelType.save()
        res.json(fuelType)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/fuel-types/:id", async(req, res) => {
    try{
        const fuelType = await FuelType.findByIdAndDelete(req.params.id) 
        if(!fuelType) return res.status(404).json({ message: "FuelType not found" });
        res.json(fuelType)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})


export default router