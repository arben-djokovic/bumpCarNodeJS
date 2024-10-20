const mongoose = require('mongoose');

const fuelTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    }
});


const FuelType = mongoose.model('FuelType', fuelTypeSchema);

module.exports = FuelType;