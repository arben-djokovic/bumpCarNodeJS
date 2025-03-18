import mongoose from "mongoose";

const fuelTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    }
});


const FuelType = mongoose.model('FuelType', fuelTypeSchema);

export default FuelType;