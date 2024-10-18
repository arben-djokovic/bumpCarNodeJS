const express = require('express');
const City = require('../models/City');
const router = express.Router();

router.get("/locations", async(req, res) => {
    try{
        const cities = await City.find()
        res.json(cities)
    }catch(err){
        res.json(err)
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
        res.json(err)
        console.log(err)
    }
})

module.exports = router;