const mongoose = require('mongoose');

const TransmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    }
});


const Transmission = mongoose.model('Transmission', TransmissionSchema);

module.exports = Transmission;