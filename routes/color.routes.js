const express = require('express');
const Color = require('../models/Color');
const router = express.Router();

router.get("/colors", async(req, res) => {
    try{
        const colors = await Color.find()
        res.json(colors)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/colors", async(req, res) => {
    try{
        const color = new Color({name: req.body.name})
        await color.save()
        res.json(color)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/colors/:id", async(req, res) => {
    try{
        const color = await Color.findByIdAndDelete(req.params.id) 
        if(!color) return res.status(404).json({ message: "Color not found" });
        res.json(color)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})


module.exports = router;