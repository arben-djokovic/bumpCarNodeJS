const express = require('express');
const Car = require("../models/Car")
const router = express.Router();

router.get("/cars", async(req, res) => {
    try{
        const cars = await Car.find({})
                                    .populate("city")
                                    .populate("body_type")
                                    .populate("brand")
                                    .populate("city")
                                    .populate("color")
                                    .populate("fuel_type")
                                    .populate("transmission")
                                    .populate("drivetrain")
        res.json(cars)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error", error: err.message });
    }
})

router.post("/cars", async(req, res) => {
    try{
        const car = new Car(req.body)
        await car.save()
        res.json(car)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error", error: err.message });
    }
})


router.get("/cars/:id", async(req, res) => {
    try{
        const car = await Car.findById(req.params.id)
                                                .populate("city")
                                                .populate("body_type")
                                                .populate("brand")
                                                .populate("city")
                                                .populate("color")
                                                .populate("fuel_type")
                                                .populate("transmission")
                                                .populate("drivetrain")
        if(!car) return res.status(404).json({ message: "Car not found" });
        res.json(car)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error", error: err.message });
    }
})
module.exports = router;