const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    },
    models: {
        type: [String],
        required: true,
        minLength: 1
    }
});


const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;