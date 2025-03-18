import mongoose from "mongoose";

const driveTrainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        unique: true
    }
});


const DriveTrain = mongoose.model('DriveTrain', driveTrainSchema);

export default DriveTrain;