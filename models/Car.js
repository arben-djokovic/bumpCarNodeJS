const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'used'],
        message: '{VALUE} is not supported'
    },
    body_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BodyType',
        required: true  
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true  
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true 
    },
    exteriorColor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true 
    },
    passengerCapacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String]
    },
    fuelType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FuelType',
        required: true 
    },
    mileage: {
        type: Number,
        required: true
    },
    transmission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transmission',
        required: true 
    },
    drivetrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drivetrain',
        required: true 
    },
    engineCapacity: {
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    cargoVolume: {
        type: Number,
        required: true
    },

});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;