const express = require('express');
const Brand = require("../models/Brand")
const router = express.Router();

router.get("/brands", async(req, res) => {
    try{
        const brands = await Brand.find({})
        res.json(brands)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/brands", async(req, res) => {
    try{
        const brand = new Brand({
            name: req.body.name
        })
        await brand.save()
        res.json(brand)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

module.exports = router;