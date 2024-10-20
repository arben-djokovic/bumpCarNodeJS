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
            name: req.body.name,
            models: req.body.models
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
                    name: req.body.name,
                    models: req.body.models
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

router.patch("/brands/:id/add-model", async(req, res) => {
    try{
        const brand = await Brand.findById(req.params.id)
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        brand.models = [...brand.models, req.body.model]

        const brand2 = await brand.save({runValidators: true})
        res.json(brand2)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.patch("/brands/:id/remove-model", async(req, res) => {
    try{
        const brand = await Brand.findById(req.params.id)
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        brand.models = brand.models.filter(el => el != req.body.model)

        const brand2 = await brand.save({runValidators: true})
        res.json(brand2)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.get("/brands/models/:brandid", async(req, res) => {
    try{
       const brand = await Brand.findById(req.params.brandid)
       if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
       }
       res.json({models: brand.models})
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

module.exports = router;