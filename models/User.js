import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    hashedPassword: {
        type: String,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true 
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
});


const User = mongoose.model('User', userSchema);

export default User;