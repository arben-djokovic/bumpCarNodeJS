import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import CityRoutes from "./routes/city.routes.js";
import BrandRoutes from "./routes/brand.routes.js";
import ColorRoutes from "./routes/color.routes.js";
import BodyTypeRoutes from "./routes/body-type.routes.js";
import FuelTypeRoutes from "./routes/fuel-type.routes.js";
import DriveTrainRoutes from "./routes/drive-train.routes.js";
import TransmissionRoutes from "./routes/transmission.routes.js";
import CarRoutes from "./routes/car.routes.js";


const app = express();


app.use(cors());
app.use(express.json());
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(CityRoutes)
app.use(BrandRoutes)
app.use(ColorRoutes)
app.use(BodyTypeRoutes)
app.use(FuelTypeRoutes)
app.use(DriveTrainRoutes)
app.use(TransmissionRoutes)
app.use(CarRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
