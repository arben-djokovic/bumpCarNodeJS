import mongoose from "mongoose";

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
        enum: ['New', 'Used'],
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
        required: true,
        minLength: 4,
        maxLength: 4
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true 
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true 
    },
    passenger_capacity: {
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
    fuel_type: {
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
        ref: 'DriveTrain',
        required: true 
    },
    engine_capacity: {
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    length: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    cargo_volume: {
        type: Number
    }

});

const Car = mongoose.model('Car', carSchema);

export default Car;