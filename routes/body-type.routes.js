const express = require('express');
const BodyType = require('../models/BodyType');
const router = express.Router();

router.get("/body-types", async(req, res) => {
    try{
        const bodyTypes = await BodyType.find()
        res.json(bodyTypes)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/body-types", async(req, res) => {
    try{
        const bodyType = new BodyType({name: req.body.name})
        await bodyType.save()
        res.json(bodyType)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.delete("/body-types/:id", async(req, res) => {
    try{
        const bodyType = await BodyType.findByIdAndDelete(req.params.id) 
        if(!bodyType) return res.status(404).json({ message: "BodyType not found" });
        res.json(bodyType)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})


module.exports = router;