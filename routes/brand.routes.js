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

module.exports = router;