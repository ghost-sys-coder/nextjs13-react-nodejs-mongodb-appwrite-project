import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;