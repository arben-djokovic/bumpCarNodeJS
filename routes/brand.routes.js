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

router.patch("/brands/:id", async(req, res) => {
    try{
        const brand = await Brand.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name
                }
            },
            {
                new: true,
                omitUndefined: true,
                runValidators: true
            }
        )
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json(brand)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/brands/:id", async(req, res) => {
    try{
        const brandDeleted = await Brand.findByIdAndDelete(req.params.id)
        if(!brandDeleted) return res.status(404).json({message: "Brand not found"})
        res.json({success: true})
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

module.exports = router;