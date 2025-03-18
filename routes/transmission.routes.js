import express from "express";
import Transmission from "../models/Transmission.js";
const router = express.Router();

router.get("/transmissions", async(req, res) => {
    try{
        const transmissions = await Transmission.find()
        res.json(transmissions)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/transmissions", async(req, res) => {
    try{
        const transmission = new Transmission({name: req.body.name})
        await transmission.save()
        res.json(transmission)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/transmissions/:id", async(req, res) => {
    try{
        const transmission = await Transmission.findByIdAndDelete(req.params.id) 
        if(!transmission) return res.status(404).json({ message: "Transmission not found" });
        res.json(transmission)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})


export default router