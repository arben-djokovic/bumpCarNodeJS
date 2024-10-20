const mongoose = require('mongoose');

const bodyTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    }
});


const BodyType = mongoose.model('BodyType', bodyTypeSchema);

module.exports = BodyType;