const express = require('express');
const { default: mongoose } = require('mongoose');
require("dotenv").config()
const app = express();
const { ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors'); // Import CORS package
const Car = require('./models/Car');
const City = require('./models/City');
const Brand = require('./models/Brand');
const CityRoutes = require('./routes/city.routes');

const mongoURI = process.env.MONGODB_URI;
app.use(cors());
app.use(express.json());
app.use(CityRoutes)

mongoose.connect(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));


app.get('/brands', async (req, res) => {
    try{
       const brands = await Brand.find({})
       res.json(brands)
    }catch(err){
        console.log(err)
    }
});
app.get('/locations', async (req, res) => {
    try{
       const brands = await Brand.find({})
       res.json(brands)
    }catch(err){
        console.log(err)
    }
});

app.get('/', async (req, res) => {
    try{
        const cars = await Car.find().populate('city');
        res.json(cars)
    }catch(err){
        console.log(err)
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
