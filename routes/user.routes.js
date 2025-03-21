import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/register", async(req, res) => {
    const { name, email, password, username, location, phone } = req.body
    if(password.length < 5) return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    if(!ObjectId.isValid(location)) return res.status(400).json({ success: false, message: "Invalid location" });
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, hashedPassword, username, location, phone})
        await user.save()
        res.json(user)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.post("/login", async(req, res) => {
    const { username, password } = req.body
    try{
        const user = await User.findOne({username})
        if(!user) return res.status(404).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(password, user.hashedPassword)
        if(!validPassword) return res.status(401).json({ message: "Invalid password" });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ success: true, token})
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

router.get("/user/me", async(req, res) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).populate("location")
        res.json(user)
    }catch(err){
        res.status(500).json({ message: "Error", error: err.message });
        console.log(err)
    }
})

export default router