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
const BrandRoutes = require('./routes/brand.routes');
const ColorRoutes = require('./routes/color.routes');
const BodyTypeRoutes = require('./routes/body-type.routes');
const FuelTypeRoutes = require('./routes/fuel-type.routes');

const mongoURI = process.env.MONGODB_URI;
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

app.use(CityRoutes)
app.use(BrandRoutes)
app.use(ColorRoutes)
app.use(BodyTypeRoutes)
app.use(FuelTypeRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
