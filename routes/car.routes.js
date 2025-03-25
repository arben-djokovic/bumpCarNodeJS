import express from "express";
import Brand from "../models/Brand.js";
import City from "../models/City.js";
import BodyType from "../models/BodyType.js";
import Color from "../models/Color.js";
import FuelType from "../models/FuelType.js";
import Transmission from "../models/Transmission.js";
import Drivetrain from "../models/DriveTrain.js";
import Car from "../models/Car.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/cars", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { year, location, maxprice, namesearch, brand, body_type, color, fueltype, transmission, drivetrain, seat_count, condition } = req.query;

    const filter = { };
    
    const parseQueryArray = (value) => {
      return value ? value.split(",") : null;
    };
    
    // Function to fetch multiple IDs for a given field
    async function getFieldIds(model, values) {
      if (!values) return null;
      const docs = await model.find({ name: { $in: values } }).select("_id");
      return docs.length > 0 ? docs.map(doc => doc._id) : null;
    }
    
    // Convert query params to arrays
    const brandArray = parseQueryArray(brand);
    const cityArray = parseQueryArray(location);
    const bodyTypeArray = parseQueryArray(body_type);
    const colorArray = parseQueryArray(color);
    const fuelTypeArray = parseQueryArray(fueltype);
    const transmissionArray = parseQueryArray(transmission);
    const drivetrainArray = parseQueryArray(drivetrain);
    const seatCountArray = parseQueryArray(seat_count)?.map(Number);
    const yearArray = parseQueryArray(year)?.map(Number);
    
    // Fetch IDs for multiple values
    const [
      brandIds,
      cityIds,
      bodyTypeIds,
      colorIds,
      fuelTypeIds,
      transmissionIds,
      drivetrainIds
    ] = await Promise.all([
      getFieldIds(Brand, brandArray),
      getFieldIds(City, cityArray),
      getFieldIds(BodyType, bodyTypeArray),
      getFieldIds(Color, colorArray),
      getFieldIds(FuelType, fuelTypeArray),
      getFieldIds(Transmission, transmissionArray),
      getFieldIds(Drivetrain, drivetrainArray),
    ]);
    
    // Apply filters dynamically
    if (brandIds) filter.brand = { $in: brandIds };
    if (cityIds) filter.city = { $in: cityIds };
    if (bodyTypeIds) filter.body_type = { $in: bodyTypeIds };
    if (colorIds) filter.color = { $in: colorIds };
    if (fuelTypeIds) filter.fuel_type = { $in: fuelTypeIds };
    if (transmissionIds) filter.transmission = { $in: transmissionIds };
    if (drivetrainIds) filter.drivetrain = { $in: drivetrainIds };
    if (seatCountArray) filter.passenger_capacity = { $in: seatCountArray }; 
    if (condition) filter.condition = condition;
    if (namesearch) filter.title = { $regex: namesearch, $options: "i" };
    if (maxprice) filter.price = { $lte: maxprice };
    if (yearArray) filter.year = { $in: yearArray };

    // Fetch cars with filters and populate fields
    const cars = await Car.find(filter)
      .limit(limit)
      .populate("city")
      .populate("body_type")
      .populate("brand")
      .populate("color")
      .populate("fuel_type")
      .populate("transmission")
      .populate("drivetrain")
      .populate("user");

    res.json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.post("/cars", async (req, res) => {
  const { title, body_type, brand, cargo_volume, color, condition, description, drivetrain, engine_capacity, fuel_type, height, length, power, transmission, width, year, price, passenger_capacity, model, mileage, location,  } = req.body;
  const bodyTypeId = await BodyType.findOne({ name: body_type });
  const brandId = await Brand.findOne({ name: brand });
  const colorId = await Color.findOne({ name: color });
  const fuelTypeId = await FuelType.findOne({ name: fuel_type });
  const transmissionId = await Transmission.findOne({ name: transmission });
  const drivetrainId = await Drivetrain.findOne({ name: drivetrain });
  const cityId = await City.findOne({ name: location });

  const getIdFromToken = () => {
    const token = req.headers.authorization.split(" ")[1];
    if(token === undefined) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  }
  const userId = getIdFromToken();

  try {
    const car = new Car({
      title,
      body_type: bodyTypeId._id,
      brand: brandId._id,
      cargo_volume,
      color: colorId._id,
      condition,
      description,
      drivetrain: drivetrainId._id,
      engine_capacity,
      fuel_type: fuelTypeId._id,
      height,
      length,
      power,
      transmission: transmissionId._id,
      width,
      year,
      price,
      passenger_capacity,
      model,
      mileage,
      city: cityId._id,
      user: userId
    });
    await car.save();
    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.get("/cars/mine", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if(token === undefined) return res.status(401).json({ message: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  if(!ObjectId.isValid(userId)) return res.status(400).json({ success: false, message: "Invalid user" });
  try {
    const cars = await Car.find({ user: userId })
      .populate("city")
      .populate("body_type")
      .populate("brand")
      .populate("color")
      .populate("fuel_type")
      .populate("transmission")
      .populate("drivetrain")
      .populate("user");
    res.json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
})

router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("city")
      .populate("body_type")
      .populate("brand")
      .populate("city")
      .populate("color")
      .populate("fuel_type")
      .populate("transmission")
      .populate("drivetrain")
      .populate("user");
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});


router.delete("/cars/:id", async (req, res) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if(token === undefined) return res.status(401).json({ message: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
})


export default router;
