const express = require('express');
const City = require('../models/City');
const router = express.Router();

router.get("/locations", async(req, res) => {
    try{
        const cities = await City.find()
        res.json(cities)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/locations", async(req, res) => {
    try{
        const city = new City({
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        })
        const response = await city.save()
        res.json(response)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.patch("/locations/:id", async(req, res) => {
    try{
        const cityUpdate = await City.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    name: req.body.name,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                }
            },
            {
                new: true,
                omitUndefined: true,
                runValidators: true
            }
        )
        
        if (!cityUpdate) {
            return res.status(404).json({ message: "City not found" });
        }

        res.json(cityUpdate)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Error", error: err.message });
    }
})

module.exports = router;