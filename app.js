const express = require('express');
const { default: mongoose } = require('mongoose');
require("dotenv").config()
const app = express();
const { ServerApiVersion } = require('mongodb');
const cors = require('cors');
const DriveTrainRoutes = require('./routes/drive-train.routes')
const CityRoutes = require('./routes/city.routes');
const BrandRoutes = require('./routes/brand.routes');
const ColorRoutes = require('./routes/color.routes');
const BodyTypeRoutes = require('./routes/body-type.routes');
const FuelTypeRoutes = require('./routes/fuel-type.routes');
const TransmissionRoutes = require('./routes//transmission.routes')
const CarRoutes = require("./routes/car.routes")


app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
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
app.use(DriveTrainRoutes)
app.use(TransmissionRoutes)
app.use(CarRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
