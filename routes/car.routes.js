import express from "express";
import Brand from "../models/Brand.js";
import City from "../models/City.js";
import BodyType from "../models/BodyType.js";
import Color from "../models/Color.js";
import FuelType from "../models/FuelType.js";
import Transmission from "../models/Transmission.js";
import Drivetrain from "../models/DriveTrain.js";
import Car from "../models/Car.js";
const router = express.Router();

router.get("/cars", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { brand, city, body_type, color, fuel_type, transmission, drivetrain, seat_count, condition } = req.query;

    const filter = { condition }; // Base filter
    
    // Helper function to convert query params into an array
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
    const cityArray = parseQueryArray(city);
    const bodyTypeArray = parseQueryArray(body_type);
    const colorArray = parseQueryArray(color);
    const fuelTypeArray = parseQueryArray(fuel_type);
    const transmissionArray = parseQueryArray(transmission);
    const drivetrainArray = parseQueryArray(drivetrain);
    const seatCountArray = parseQueryArray(seat_count)?.map(Number); // Convert to numbers
    
    // Fetch IDs for multiple values
    const [
      brandIds,
      cityIds,
      bodyTypeIds,
      colorIds,
      fuelTypeIds,
      transmissionIds,
      drivetrainIds,
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
    if (seatCountArray) filter.passenger_capacity = { $in: seatCountArray }; // Handle numeric filtering
    
    // Fetch cars with filters and populate fields
    const cars = await Car.find(filter)
      .limit(limit)
      .populate("city")
      .populate("body_type")
      .populate("brand")
      .populate("color")
      .populate("fuel_type")
      .populate("transmission")
      .populate("drivetrain");
    
    res.json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.post("/cars", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

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
      .populate("drivetrain");
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});
export default router;
